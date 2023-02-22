import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class OrganizationStatusSelectComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);

    this.loadOrganizationStatusesTask.perform();
  }

  get selectedOrganizationStatus() {
    if (typeof this.args.selected === 'string') {
      return this.findOrganizationStatusById(this.args.selected);
    }

    return this.args.selected;
  }

  findOrganizationStatusById(id) {
    if (this.loadOrganizationStatusesTask.isRunning) {
      return null;
    }

    let organizationStatuses = this.loadOrganizationStatusesTask.last.value;
    return organizationStatuses.find((status) => status.id === id);
  }

  @task *loadOrganizationStatusesTask() {
    const statuses = yield this.store.findAll('organization-status-code');
    // We hide non active besturen
    return statuses.filter(
      (status) => status.id != 'd02c4e12bf88d2fdf5123b07f29c9311'
    );
  }
}
