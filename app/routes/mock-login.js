import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MockLoginRoute extends Route {
  @service session;
  @service store;
  @service currentSession;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  async beforeModel() {
    if (this.session.isAuthenticated) {
      await this.currentSession.load();
      if (!this.currentSession.roles?.includes('ControllerWOP')) {
        this.session.prohibitAuthentication('index');
      }
    }
  }

  model(params) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (params.gemeente) filter.user = { 'family-name': params.gemeente };
    return this.store.query('account', {
      include: 'user.groups',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'user.family-name',
    });
  }
}
