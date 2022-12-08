import Route from '@ember/routing/route';
import { keepLatestTask } from 'ember-concurrency';
import { CLASSIFICATION } from 'frontend-worship-organizations/models/administrative-unit-classification-code';

export default class AdministrativeUnitsIndexRoute extends Route {
  queryParams = {
    page: { refreshModel: true },
    sort: { refreshModel: true },
    name: { refreshModel: true, replace: true },
    municipality: { refreshModel: true, replace: true },
    province: { refreshModel: true, replace: true },
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
        'primary-site.address',
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

    if (params.province) {
      query['filter[primary-site][address][province]'] = params.province;
    }

    if (params.recognizedWorshipTypeId) {
      query['filter[recognized-worship-type][:id:]'] =
        params.recognizedWorshipTypeId;
    }

    if (params.organizationStatus) {
      query['filter[organization-status][:id:]'] = params.organizationStatus;
    }

    return yield this.store.query('worship-administrative-unit', query);
  }
}
