import Model, { attr, hasMany } from '@ember-data/model';

export default class DecisionActivityModel extends Model {
  @attr('date') endDate;

  @hasMany('decision', {
    async: true,
    inverse: 'hasDecisionActivity',
  })
  givesCauseTo;
}
