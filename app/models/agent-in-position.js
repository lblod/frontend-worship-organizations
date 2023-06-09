import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class AgentInPositionModel extends Model {
  @attr('date') agentStartDate;
  @attr('date') agentEndDate;

  @belongsTo('post', {
    async: true,
    inverse: 'agentsInPosition',
  })
  position;

  @belongsTo('person', {
    async: true,
    inverse: 'agentsInPosition',
  })
  person;

  @hasMany('contact-point', {
    async: true,
    inverse: null,
  })
  contacts;
}
