import Route from '@ember/routing/route';
import { service } from '@ember/service';

import ENV from 'frontend-worship-organizations/config/environment';
export default class IndexRoute extends Route {
  @service session;
  @service currentSession;
  @service router;

  async beforeModel(transition) {
    if (this.session.isAuthenticated) {
      await this.currentSession.load();
      if (
        ENV.controllerLogin === 'true' &&
        this.currentSession.roles?.includes('ControllerWOP')
      ) {
        this.router.replaceWith('/controller-login');
      }
    } else {
      this.session.requireAuthentication(transition, 'login');
    }
  }
}
