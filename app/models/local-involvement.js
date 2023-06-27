import Model, { attr, belongsTo } from '@ember-data/model';

export default class PublicInvolvementModel extends Model {
  @attr('number') percentage;

  @belongsTo('involvement-type', {
    async: true,
    inverse: null,
  })
  involvementType;

  @belongsTo('worship-service', {
    async: true,
    inverse: 'involvements',
  })
  worshipService;

  @belongsTo('administrative-unit', {
    async: true,
    inverse: 'involvedBoards',
  })
  administrativeUnit;
}
