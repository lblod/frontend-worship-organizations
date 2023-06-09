import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AdministrativeUnitsAdministrativeUnitMinistersController extends Controller {
  @service router;

  get currentURL() {
    return this.router.currentURL;
  }
}
