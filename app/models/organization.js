import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr name;
  @attr alternativeName;

  @belongsTo('site', {
    async: true,
    inverse: null,
  })
  primarySite;

  @belongsTo('organization-status-code', {
    async: true,
    inverse: null,
  })
  organizationStatus;

  @hasMany('identifier', {
    async: true,
    inverse: null,
  })
  identifiers;

  @hasMany('site', {
    async: true,
    inverse: null,
  })
  sites;

  @hasMany('post', {
    async: true,
    inverse: null,
  })
  positions;

  @hasMany('organization', {
    async: true,
    inverse: 'isSubOrganizationOf',
  })
  subOrganizations;

  @belongsTo('organization', {
    async: true,
    inverse: 'subOrganizations',
  })
  isSubOrganizationOf;

  @hasMany('organization', {
    async: true,
    inverse: 'isAssociatedWith',
  })
  associatedOrganizations;

  @belongsTo('organization', {
    async: true,
    inverse: 'associatedOrganizations',
  })
  isAssociatedWith;
}
