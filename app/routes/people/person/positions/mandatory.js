import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PeoplePersonPositionsMandatoryRoute extends Route {
  @service store;

  async model({ mandatoryId }) {
    let person = this.modelFor('people.person');

    let mandatory = await this.store.findRecord('mandatory', mandatoryId, {
      reload: true,
    });

    return {
      person,
      mandatory,
    };
  }
}
