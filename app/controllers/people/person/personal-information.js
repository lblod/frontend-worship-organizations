import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class PeoplePersonPersonalInformationController extends Controller {
  @service router;

  get currentURL() {
    return this.router.currentURL;
  }

  get nationalities() {
    return this.model.nationalities.map((n) => n.nationalityLabel).join(', ');
  }
}
