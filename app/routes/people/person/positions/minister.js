import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PeoplePersonPositionsMinisterRoute extends Route {
  @service store;

  async model({ ministerId }) {
    let person = this.modelFor('people.person');

    let minister = await this.store.findRecord('minister', ministerId, {
      reload: true,
    });

    return {
      person,
      minister,
    };
  }
}
