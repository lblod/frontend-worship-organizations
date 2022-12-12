import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SecuredAreaComponent extends Component {
  @service currentSession;

  get canOnlyRead() {
    return this.currentSession.canOnlyRead;
  }
}
