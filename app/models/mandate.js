import { hasMany, belongsTo } from '@ember-data/model';
import PostModel from './post';

export default class MandateModel extends PostModel {
  @belongsTo('board-position-code', {
    async: true,
    inverse: null,
  })
  roleBoard;

  @belongsTo('governing-body', {
    async: true,
    inverse: 'mandates',
  })
  governingBody;

  @hasMany('mandatory', {
    async: true,
    inverse: 'mandate',
    polymorphic: true,
    as: 'mandate',
  })
  heldBy;
}
