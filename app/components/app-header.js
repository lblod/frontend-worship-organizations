import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AppHeaderComponent extends Component {
  @service currentSession;
  @service session;

  get title() {
    return `${this.currentSession.user.firstName} ${this.currentSession.user.familyName}`;
  }

  @action
  logout() {
    this.session.invalidate();
  }
}
