import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { CLASSIFICATION_CODE } from 'frontend-worship-organizations/models/administrative-unit-classification-code';

export default class AdministrativeUnitsIndexController extends Controller {
  @service router;
  @service currentSession;

  queryParams = [
    'page',
    'size',
    'sort',
    'name',
    'municipality',
    'classificationId',
    'recognizedWorshipTypeId',
    'organizationStatus',
  ];

  @tracked page = 0;
  size = 25;
  @tracked sort = 'name';
  @tracked name = '';
  @tracked municipality = '';
  @tracked classificationId = '';
  @tracked recognizedWorshipTypeId = '';
  @tracked organizationStatus = '';

  @tracked selectedMunicipality;

  get isLoggedInAsMunicipality() {
    return (
      this.currentSession.groupClassification.id ==
      CLASSIFICATION_CODE.MUNICIPALITY
    );
  }

  get administrativeUnits() {
    return this.model.loadAdministrativeUnitsTaskInstance.isFinished
      ? this.model.loadAdministrativeUnitsTaskInstance.value
      : this.model.loadedAdministrativeUnits;
  }

  get isLoading() {
    return this.model.loadAdministrativeUnitsTaskInstance.isRunning;
  }

  get hasPreviousData() {
    return (
      this.model.loadedAdministrativeUnits &&
      this.model.loadedAdministrativeUnits.length > 0
    );
  }

  get hasNoResults() {
    return (
      this.model.loadAdministrativeUnitsTaskInstance.isFinished &&
      this.administrativeUnits.length === 0
    );
  }

  get hasErrored() {
    return this.model.loadAdministrativeUnitsTaskInstance.isError;
  }

  get modelHasOnlyWorshipAdministrativeUnits() {
    if (this.administrativeUnits) {
      return !this.administrativeUnits.toArray().some((adminUnit) => {
        return (
          adminUnit.get('classification').get('id') !==
            CLASSIFICATION_CODE.WORSHIP_SERVICE &&
          adminUnit.get('classification').get('id') !==
            CLASSIFICATION_CODE.CENTRAL_WORSHIP_SERVICE
        );
      });
    }
    return false;
  }

  get isWorshipAdministrativeUnit() {
    return this.isWorshipService || this.isCentralWorshipService;
  }

  get isWorshipService() {
    return this.classificationId === CLASSIFICATION_CODE.WORSHIP_SERVICE;
  }

  get isCentralWorshipService() {
    return (
      this.classificationId === CLASSIFICATION_CODE.CENTRAL_WORSHIP_SERVICE
    );
  }

  @action
  search(event) {
    event.preventDefault();

    if (this.page > 0) {
      // resetting the pagination will refresh the model
      this.resetPagination();
    } else {
      this.router.refresh();
    }
  }

  @action
  setClassificationId(selection) {
    this.page = null;
    this.classificationId = selection?.id;
    if (!this.isWorshipAdministrativeUnit) {
      this.recognizedWorshipTypeId = '';
    }
  }

  @action
  setRecognizedWorshipTypeId(selection) {
    this.page = null;
    this.recognizedWorshipTypeId = selection?.id;
  }

  @action
  setName(selection) {
    this.page = null;
    this.name = selection;
  }

  @action
  setOrganizationStatus(selection) {
    this.page = null;
    if (selection !== null) {
      this.organizationStatus = selection.id;
    } else {
      this.organizationStatus = '';
    }
  }

  @action
  setMunicipality(selection) {
    this.page = null;
    this.selectedMunicipality = selection;
    if (selection !== null) {
      this.municipality = selection.name;
    } else {
      this.municipality = '';
    }
  }

  resetPagination() {
    this.page = 0;
  }

  @action
  resetFilters() {
    this.name = '';
    this.municipality = '';
    this.classificationId = '';
    this.recognizedWorshipTypeId = '';
    this.organizationStatus = '';
    this.page = 0;
    this.sort = 'name';

    this.selectedMunicipality = null;
    // Triggers a refresh of the model
    this.page = null;
  }
}
