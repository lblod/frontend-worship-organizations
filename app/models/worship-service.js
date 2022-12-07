import { attr, hasMany } from '@ember-data/model';
import WorshipAdministrativeUnitModel from './worship-administrative-unit';

export default class WorshipServiceModel extends WorshipAdministrativeUnitModel {
  @attr denomination;
  @attr crossBorder;

  @hasMany('local-involvement', {
    inverse: 'worshipService',
  })
  involvements;

  get crossBorderNominal() {
    if (this.crossBorder) {
      return 'Ja';
    } else {
      return 'Nee';
    }
  }
}
