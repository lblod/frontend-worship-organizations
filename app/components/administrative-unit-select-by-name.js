import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency';

export default class AdministrativeUnitSelectByNameComponent extends Component {
  @service store;

  @restartableTask
  *loadAdministrativeUnitsTask(searchParams = '') {
    const query = {
      sort: 'name',
      include: 'classification',
    };

    if (searchParams.trim() !== '') {
      query['filter[name]'] = searchParams;
    }

    const result = yield this.store.query('administrative-unit', query);

    if (result) {
      return [...[searchParams], ...new Set(result.map((r) => r.name))];
    }
  }
}
