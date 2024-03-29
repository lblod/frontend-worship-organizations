import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PeoplePersonPositionsMandatoryRoute extends Route {
  @service store;

  async model({ agentId }) {
    let person = this.modelFor('people.person');

    let agent = await this.store.findRecord('agent', agentId, {
      reload: true,
    });

    return {
      person,
      agent,
    };
  }
}
