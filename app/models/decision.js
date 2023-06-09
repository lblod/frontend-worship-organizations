import Model, { attr, belongsTo } from '@ember-data/model';

export default class DecisionModel extends Model {
  @attr('date') publicationDate;
  @attr documentLink;

  @belongsTo('decision-activity', {
    async: true,
    inverse: 'givesCauseTo',
  })
  hasDecisionActivity;
}

export function isEmpty(decisionRecord) {
  return !decisionRecord.publicationDate && !decisionRecord.documentLink;
}
