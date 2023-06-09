import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdministrativeUnitsAdministrativeUnitMinistersRoute extends Route {
  @service store;

  async model() {
    let { id: administrativeUnitId } = this.paramsFor(
      'administrative-units.administrative-unit'
    );

    let administrativeUnit = await this.store.findRecord(
      'worship-service',
      administrativeUnitId,
      {
        reload: true,
      }
    );

    let ministerPositions = await administrativeUnit.ministerPositions;
    let ministers = [];

    for (const ministerPosition of ministerPositions) {
      const heldByMinisters = await ministerPosition.heldByMinisters;
      if (heldByMinisters.length) {
        ministers.push(...heldByMinisters);
      }
    }

    return {
      administrativeUnit: administrativeUnit,
      ministers,
    };
  }
}
