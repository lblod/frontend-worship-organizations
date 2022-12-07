import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class PeoplePersonPersonalInformationController extends Controller {
  @service router;

  get currentURL() {
    return this.router.currentURL;
  }

  get nationalities() {
    return this.model.person.nationalities
      .map((n) => n.nationalityLabel)
      .join(', ');
  }
}
