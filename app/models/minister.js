import { hasMany, belongsTo } from '@ember-data/model';
import AgentInPositionModel from './agent-in-position';
import { tracked } from '@glimmer/tracking';

export default class MinisterModel extends AgentInPositionModel {
  // used for validations
  @tracked isCurrentPosition;

  @belongsTo('minister-position', {
    async: true,
    inverse: 'heldByMinisters',
  })
  ministerPosition;

  @belongsTo('financing-code', {
    async: true,
    inverse: null,
  })
  financing;

  @hasMany('minister-condition', {
    async: true,
    inverse: null,
  })
  conditions;
}
