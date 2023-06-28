import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class GoverningBodyModel extends Model {
  @attr('date') startDate;
  @attr('date') endDate;

  @belongsTo('administrative-unit', {
    async: true,
    inverse: 'governingBodies',
    polymorphic: true,
  })
  administrativeUnit;

  @belongsTo('governing-body-classification-code', {
    async: true,
    inverse: null,
  })
  classification;

  @belongsTo('governing-body', {
    async: true,
    inverse: 'hasTimeSpecializations',
  })
  isTimeSpecializationOf;

  @hasMany('governing-body', {
    async: true,
    inverse: 'isTimeSpecializationOf',
  })
  hasTimeSpecializations;

  @hasMany('mandate', {
    async: true,
    inverse: 'governingBody',
  })
  mandates;

  @hasMany('board-position', {
    async: true,
    inverse: 'governingBodies',
  })
  boardPositions;

  get period() {
    let period = '-';
    if (this.startDate && this.endDate) {
      period =
        this.startDate.getFullYear() + ' - ' + this.endDate.getFullYear();
    } else if (this.startDate) {
      period = this.startDate.getFullYear() + ' -';
    } else if (this.endDate) {
      period = '- ' + this.endDate.getFullYear();
    }
    return period;
  }
}
