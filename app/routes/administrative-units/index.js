import Route from '@ember/routing/route';
import { keepLatestTask } from 'ember-concurrency';
import { CLASSIFICATION } from 'frontend-worship-organizations/models/administrative-unit-classification-code';
import { service } from '@ember/service';

export default class AdministrativeUnitsIndexRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    sort: { refreshModel: true },
    name: { refreshModel: true, replace: true },
    municipality: { refreshModel: true, replace: true },
    classificationId: { refreshModel: true, replace: true },
    recognizedWorshipTypeId: { refreshModel: true, replace: true },
    organizationStatus: { refreshModel: true, replace: true },
  };

  async model(params) {
    return {
      loadAdministrativeUnitsTaskInstance:
        this.loadAdministrativeUnitsTask.perform(params),
      loadedAdministrativeUnits:
        this.loadAdministrativeUnitsTask.lastSuccessful?.value,
    };
  }

  @keepLatestTask({ cancelOn: 'deactivate' })
  *loadAdministrativeUnitsTask(params) {
    let query = {
      include: [
        'classification',
        'recognized-worship-type',
        'organization-status',
      ].join(),
      page: {
        number: params.page,
        size: params.size,
      },
      sort: params.sort,
    };

    if (params.name) {
      query['filter[name]'] = params.name;
    }

    if (params.classificationId) {
      query['filter[classification][:id:]'] = params.classificationId;
    } else {
      query['filter[classification][:id:]'] = [
        CLASSIFICATION.WORSHIP_SERVICE.id,
        CLASSIFICATION.CENTRAL_WORSHIP_SERVICE.id,
      ].join();
    }

    if (params.municipality) {
      query['filter[primary-site][address][:exact:municipality]'] =
        params.municipality;
    }

    if (params.recognizedWorshipTypeId) {
      query['filter[recognized-worship-type][:id:]'] =
        params.recognizedWorshipTypeId;
    }

    if (params.organizationStatus) {
      query['filter[organization-status][:id:]'] = params.organizationStatus;
    } else {
      // We filter out non-active besturen
      query[
        'filter[organization-status][:id:]'
      ] = `63cc561de9188d64ba5840a42ae8f0d6,abf4fee82019f88cf122f986830621ab`; // Actief or In oprichting
    }

    return yield this.store.query('worship-administrative-unit', query);
  }
}
