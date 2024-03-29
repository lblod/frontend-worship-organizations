import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CallbackRoute extends Route {
  @service session;

  queryParams = ['code'];
  beforeModel() {
    // redirect to index if already authenticated
    this.session.prohibitAuthentication('index');
  }

  async model() {
    this.session.authenticate('authenticator:acm-idm', this.code);
  }
}
