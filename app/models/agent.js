import { attr, belongsTo } from '@ember-data/model';
import AgentInPositionModel from './agent-in-position';

export default class AgentModel extends AgentInPositionModel {
  @attr('date') startDate;
  @attr('date') endDate;

  @belongsTo('agent-status-code', {
    async: true,
    inverse: null,
  })
  status;

  @belongsTo('person', {
    async: true,
    inverse: 'agents',
    as: 'agent',
  })
  governingAlias;

  @belongsTo('board-position', {
    async: true,
    inverse: null,
  })
  boardPosition;
}
