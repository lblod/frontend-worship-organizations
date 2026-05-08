import Component from '@glimmer/component';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { trackedTask } from 'reactiveweb/ember-concurrency';
import { CENTRAL_WORSHIP_SERVICE_BLACKLIST } from 'frontend-worship-organizations/models/recognized-worship-type';
import { CLASSIFICATION_CODE } from 'frontend-worship-organizations/models/administrative-unit-classification-code';

export default class RecognizedWorshipTypeSelect extends Component {
  @service store;

  get selectedRecognizedWorshipType() {
    if (typeof this.args.selected === 'string') {
      return this.getRecognizedWorshipTypeById(this.args.selected);
    }

    return this.args.selected;
  }

  getRecognizedWorshipTypeById(id) {
    if (this.recognizedWorshipTypes.isRunning) {
      return null;
    }

    return this.recognizedWorshipTypes.value.find(
      (worshipType) => worshipType.id === id,
    );
  }

  loadRecognizedWorshipTypesTask = task(async () => {
    // Trick used to avoid infinite loop
    // See https://github.com/NullVoxPopuli/ember-resources/issues/340 for more details
    await Promise.resolve();

    let recognizedWorshipTypes = await this.store.query(
      'recognized-worship-type',
      { sort: 'label' },
    );

    if (
      this.args.selectedClassificationId ==
      CLASSIFICATION_CODE.CENTRAL_WORSHIP_SERVICE
    ) {
      // Filter out blacklisted types for central worship services
      recognizedWorshipTypes = recognizedWorshipTypes.filter(
        (t) => !this.isIdInBlacklist(t.id),
      );
    }

    return recognizedWorshipTypes;
  });

  isIdInBlacklist(id) {
    return CENTRAL_WORSHIP_SERVICE_BLACKLIST.find((element) => element == id);
  }

  recognizedWorshipTypes = trackedTask(
    this,
    this.loadRecognizedWorshipTypesTask,
    () => [this.args.selectedClassificationId],
  );
}
