import Model, { hasMany, belongsTo } from '@ember-data/model';

export default class SiteModel extends Model {
  @belongsTo('address', {
    async: true,
    inverse: null,
  })
  address;

  @hasMany('contact-point', {
    async: true,
    inverse: null,
  })
  contacts;

  @belongsTo('site-type', {
    async: true,
    inverse: null,
  })
  siteType;
}
