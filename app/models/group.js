import Model, { attr, belongsTo } from '@ember-data/model';

export default class GroupModel extends Model {
  @attr name;

  @belongsTo('administrative-unit-classification-code', {
    inverse: null,
  })
  classification;
}
