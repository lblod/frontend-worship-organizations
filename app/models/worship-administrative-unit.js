import { belongsTo, hasMany } from '@ember-data/model';
import AdministrativeUnitModel from './administrative-unit';

export default class WorshipAdministrativeUnitModel extends AdministrativeUnitModel {
  @belongsTo('recognized-worship-type', {
    async: true,
    inverse: null,
  })
  recognizedWorshipType;

  @hasMany('minister-position', {
    async: true,
    inverse: 'worshipService',
  })
  ministerPositions;
}
