import { attr, hasMany, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import AgentInPositionModel from './agent-in-position';

export default class MandatoryModel extends AgentInPositionModel {
  // TODO: These are only used for validations
  // We should find a better way to solve this
  @tracked isCurrentPosition;
  @tracked role;

  @attr('date') startDate;
  @attr('date') endDate;

  @belongsTo('mandatory-status-code', {
    async: true,
    inverse: null,
  })
  status;

  @belongsTo('person', {
    async: true,
    inverse: 'mandatories',
  })
  governingAlias;

  @belongsTo('mandate', {
    async: true,
    inverse: 'heldBy',
  })
  mandate;

  @hasMany('contact-point', {
    async: true,
    inverse: null,
  })
  contacts;
}
