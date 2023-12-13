import Controller from '@ember/controller';
import { service } from '@ember/service';
import { restartableTask, task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class ControllerLoginController extends Controller {
  queryParams = ['gemeente', 'page'];
  @service store;
  @service router;
  @service session;
  @tracked gemeente = '';
  @tracked page = 0;
  size = 10;

  @task
  *queryStore() {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (this.gemeente) filter.user = { 'family-name': this.gemeente };
    const accounts = yield this.store.query('account', {
      include: 'user,user.groups',
      filter: filter,
      page: { size: this.size, number: this.page },
      sort: 'user.family-name',
    });
    return accounts;
  }

  @restartableTask
  *updateSearch(value) {
    yield timeout(500);
    this.page = 0;
    this.gemeente = value;
    this.model = yield this.queryStore.perform();
  }

  @task
  *loginTask(accountId, groupId) {
    console.log('gid', groupId);
    console.log('accountId', accountId);
    this.errorMessage = '';
    try {
      yield this.session.authenticate(
        'authenticator:controller-login',
        accountId,
        groupId
      );
      this.router.replaceWith('index');
    } catch (response) {
      console.log('error', response);
      if (response instanceof Response)
        this.errorMessage = `Something went wrong, please try again later (status: ${response.status} ${response.statusText})`;
      else this.errorMessage = response.message;
    }
  }
}
