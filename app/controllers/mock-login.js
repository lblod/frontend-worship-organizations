import Controller from '@ember/controller';
import { service } from '@ember/service';
import { restartableTask, task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class MockLoginController extends Controller {
  queryParams = ['gemeente', 'page'];

  @service store;
  @tracked gemeente = '';
  @tracked page = 0;
  size = 10;

  queryStore = task(async () => {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (this.gemeente) filter.user = { 'family-name': this.gemeente };
    const accounts = await this.store.query('account', {
      include: 'user,user.groups',
      filter: filter,
      page: { size: this.size, number: this.page },
      sort: 'user.family-name',
    });
    return accounts;
  });

  updateSearch = restartableTask(async value => {
    await timeout(500);
    this.page = 0;
    this.gemeente = value;
    this.model = await this.queryStore.perform();
  });
}
