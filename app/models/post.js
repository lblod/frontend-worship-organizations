import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class PostModel extends Model {
  @belongsTo('role', {
    async: true,
    inverse: null,
  })
  generalRole;

  @belongsTo('organization', {
    async: true,
    inverse: null,
  })
  organization;

  @hasMany('agent-in-position', {
    async: true,
    inverse: 'position',
    polymorphic: true,
    as: 'post',
  })
  agentsInPosition;
}
