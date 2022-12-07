import Route from '@ember/routing/route';

export default class AdministrativeUnitsAdministrativeUnitMinistersIndexRoute extends Route {
  model() {
    return this.modelFor('administrative-units.administrative-unit.ministers');
  }
}
