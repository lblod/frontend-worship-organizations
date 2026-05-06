import { hasMany, belongsTo } from '@ember-data/model';
import OrganizationModel from './organization';

export default class AdministrativeUnitModel extends OrganizationModel {
  @belongsTo('administrative-unit-classification-code', {
    async: true,
    inverse: null,
  })
  classification;

  @belongsTo('location', {
    inverse: 'administrativeUnits',
    async: true,
    polymorphic: true,
    as: 'administrative-unit',
  })
  locatedWithin;

  @hasMany('governing-body', {
    async: true,
    inverse: 'administrativeUnit',
    as: 'administrative-unit',
  })
  governingBodies;

  @hasMany('local-involvement', {
    inverse: 'administrativeUnit',
    async: true,
    polymorphic: true,
    as: 'administrative-unit',
  })
  involvedBoards;

  @belongsTo('concept', {
    async: true,
    inverse: null,
  })
  exactMatch;

  @belongsTo('location', {
    async: true,
    inverse: null,
  })
  scope;
}
