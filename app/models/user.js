import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr familyName;

  @hasMany('account', {
    async: false,
    inverse: 'user',
  })
  accounts;

  @hasMany('group', {
    async: false,
    inverse: null,
  })
  groups;

  get group() {
    return this.groups[0];
  }

  get fullName() {
    return `${this.firstName} ${this.familyName}`.trim();
  }
}
