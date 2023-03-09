import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { EXECUTIVE_ORGANEN } from 'frontend-worship-organizations/models/governing-body-classification-code';

export default class AdministrativeUnitsAdministrativeUnitGoverningBodiesRoute extends Route {
  @service store;

  async model() {
    let { id: administrativeUnitId } = this.paramsFor(
      'administrative-units.administrative-unit'
    );

    let administrativeUnit = await this.store.findRecord(
      'administrative-unit',
      administrativeUnitId,
      {
        reload: true,
      }
    );

    let untimedGoverningBodies = await administrativeUnit.governingBodies;
    let governingBodies = [];

    for (let governingBody of untimedGoverningBodies.toArray()) {
      const governingBodyClassification = await governingBody.classification;
      if (
        !EXECUTIVE_ORGANEN.find((id) => id === governingBodyClassification.id)
      ) {
        const timedGoverningBodies = governingBody
          ? await governingBody.hasTimeSpecializations
          : [];

        const sortedTimesGoverningBodies = timedGoverningBodies
          .toArray()
          .sort((a, b) => {
            if (a.endDate && b.endDate) {
              return b.endDate - a.endDate;
            }
            return b.startDate - a.startDate;
          });

        governingBodies.push(...sortedTimesGoverningBodies);
      }
    }

    return {
      administrativeUnit,
      governingBodies: governingBodies,
    };
  }
}
