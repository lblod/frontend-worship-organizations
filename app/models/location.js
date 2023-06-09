import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class LocationModel extends Model {
  @attr label;
  @attr level;

  @hasMany('administrative-unit', {
    async: true,
    inverse: 'locatedWithin',
  })
  administrativeUnits;

  @belongsTo('location', {
    async: true,
    inverse: 'locations',
  })
  locatedWithin;

  @hasMany('locations', {
    async: true,
    inverse: 'locatedWithin',
  })
  locations;

  @belongsTo('concept')
  exactMatch;
}
