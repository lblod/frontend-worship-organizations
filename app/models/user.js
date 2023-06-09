import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr familyName;

  @hasMany('account', {
    async: true,
    inverse: 'user',
  })
  accounts;

  @hasMany('group', {
    async: true,
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
