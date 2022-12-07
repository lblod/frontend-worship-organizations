import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { restartableTask, timeout } from 'ember-concurrency';

export default class WorshipServiceSelectComponent extends Component {
  @service store;

  @restartableTask
  *loadWorshipServicesTask(searchParams = '') {
    yield timeout(500);

    const query = {
      sort: 'name',
    };

    if (searchParams.trim() !== '') {
      query['filter[name]'] = searchParams;
    }

    return yield this.store.query('worship-service', query);
  }
}
