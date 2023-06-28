import Model, { attr, belongsTo } from '@ember-data/model';

export default class GroupModel extends Model {
  @attr name;

  @belongsTo('administrative-unit-classification-code', {
    async: false,
    inverse: null,
  })
  classification;
}
