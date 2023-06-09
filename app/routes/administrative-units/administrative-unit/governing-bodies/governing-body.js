import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdministrativeUnitsAdministrativeUnitGoverningBodiesGoverningBodyRoute extends Route {
  @service store;

  async model({ governingBodyId }) {
    const administrativeUnit = this.modelFor(
      'administrative-units.administrative-unit'
    );

    const governingBody = await this.store.findRecord(
      'governing-body',
      governingBodyId,
      {
        reload: true,
      }
    );

    const untimedGoverningBodiy = await governingBody.isTimeSpecializationOf;
    const governingBodyClassification =
      await untimedGoverningBodiy.classification;

    return {
      administrativeUnit,
      governingBodyClassification,
      governingBody,
    };
  }
}
