import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const READER_ROLES = ['LoketLB-eredienstOrganisatiesGebruiker'];

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;
  @tracked user;
  @tracked title;
  @tracked group;
  @tracked roles;

  async load() {
    if (this.session.isAuthenticated) {
      let sessionData = this.session.data.authenticated.relationships;
      this.roles = this.session.data.authenticated.data?.attributes?.roles;
      let accountId = sessionData.account.data.id;
      this.account = await this.store.findRecord('account', accountId, {
        include: 'user',
      });
      this.user = await this.account.user;
      this.title = `${this.user.firstName} ${this.user.familyName}`;
    }
  }

  get canOnlyRead() {
    return this.roles.some((role) => READER_ROLES.includes(role));
  }
}
