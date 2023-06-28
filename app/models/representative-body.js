import { belongsTo, hasMany } from '@ember-data/model';
import OrganizationModel from './organization';

export default class RepresentativeBodyModel extends OrganizationModel {
  @belongsTo('recognized-worship-type', {
    async: true,
    inverse: null,
  })
  recognizedWorshipType;

  @hasMany('minister-positions', {
    async: true,
    inverse: 'representativeBody',
  })
  ministerPositions;
}
