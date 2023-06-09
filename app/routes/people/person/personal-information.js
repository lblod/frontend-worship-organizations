import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PeoplePersonPersonalInformationRoute extends Route {
  @service store;
  @service router;
  @service contactDetails;

  async model() {
    let { id: personId } = this.paramsFor('people.person');

    const { person, positions } =
      await this.contactDetails.getPersonAndAllPositions(personId);

    const registration = await person.registration;
    let ssn = null;
    if (registration) {
      ssn = await registration.structuredIdentifier;
    }

    return {
      person,
      ssn,
      positions,
    };
  }
}
