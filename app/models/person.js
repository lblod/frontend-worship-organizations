import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr givenName;
  @attr familyName;
  @attr firstNameUsed;

  @hasMany('mandatory', {
    async: true,
    inverse: 'governingAlias',
    polymorphic: true,
  })
  mandatories;

  @hasMany('agent', {
    async: true,
    inverse: 'governingAlias',
    polymorphic: true,
  })
  agents;

  @hasMany('agent-in-position', {
    async: true,
    inverse: 'person',
    polymorphic: true,
  })
  agentsInPosition;

  @hasMany('nationality', {
    async: true,
    inverse: null,
  })
  nationalities;

  @belongsTo('date-of-birth', {
    async: true,
    inverse: null,
  })
  dateOfBirth;

  @belongsTo('gender-code', {
    async: true,
    inverse: null,
  })
  gender;

  @belongsTo('identifier', {
    async: true,
    inverse: null,
  })
  registration;
}
