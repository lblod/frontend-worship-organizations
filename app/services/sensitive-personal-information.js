import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const PRIVACY_CENTRIC_SERVICE_ENDPOINT = {
  REQUEST: '/person-information-requests',
  ASK: '/person-information-ask',
};

const STORAGE = new Map();

export default class SensitivePersonalInformationService extends Service {
  @service store;

  hasStoredSensitiveInformation(person) {
    return STORAGE.has(person.id);
  }

  getStoredSensitiveInformation(person) {
    const sensitiveInfo = STORAGE.get(person.id);
    if (sensitiveInfo) {
      return new SensitivePersonalInformation(sensitiveInfo);
    }
    return null;
  }

  /**
   * Check what sensitive data are present for a person
   * @param {PersonModel} person
   */
  async askInformation(person) {
    const askEndpoint = `${PRIVACY_CENTRIC_SERVICE_ENDPOINT.ASK}/${person.id}`;
    let response = await this._request(askEndpoint, {});
    let data = await response.json();
    return await this.mapSensitivePersonalInformation(data?.data, true);
  }

  /**
   * Request sensitive information from a specific person
   *
   * @param {PersonModel} person
   * @param {RequestReasonModel} requestReason
   * @returns {Promise<SensitivePersonalInformation>}
   */
  async getInformation(person, requestReason) {
    let body = {
      data: {
        type: 'person-information-requests',
        relationships: {
          person: {
            data: {
              type: 'people',
              id: person.id,
            },
          },
          reason: {
            data: {
              type: 'request-reasons',
              id: requestReason.id,
            },
          },
        },
      },
    };

    let response = await this._request(
      PRIVACY_CENTRIC_SERVICE_ENDPOINT.REQUEST,
      body
    );
    let data = (await response.json()).data;
    let sensitiveInfo = await this.mapSensitivePersonalInformation(data);
    STORAGE.set(person.id, sensitiveInfo);
    return sensitiveInfo;
  }

  async mapSensitivePersonalInformation(data, obfuscated = false) {
    let sensitiveInformation = {};
    let dateOfBirth = data?.attributes?.['date-of-birth'];
    let registration = data?.attributes?.registration;
    let nationalities = data?.relationships?.nationalities?.data;
    let genderData = data?.relationships?.gender?.data;
    if (dateOfBirth) {
      sensitiveInformation.dateOfBirth = obfuscated
        ? dateOfBirth
        : new Date(dateOfBirth);
    }

    if (registration) {
      sensitiveInformation.ssn = registration;
    }

    if (nationalities?.length > 0) {
      let idList = nationalities.map((nationaly) => nationaly.id).join();
      if (obfuscated) {
        sensitiveInformation.nationalities = idList;
      } else {
        let nationalities = await this.store.query('nationality', {
          filter: {
            ':id:': idList,
          },
        });
        sensitiveInformation.nationalities = nationalities.toArray();
      }
    }

    if (genderData?.id) {
      if (obfuscated) {
        sensitiveInformation.gender = genderData;
      } else {
        let gender = await this.store.findRecord('gender-code', genderData.id);
        sensitiveInformation.gender = gender;
      }
    }

    return new SensitivePersonalInformation(sensitiveInformation);
  }

  async _request(endpoint, body) {
    return await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(body),
    });
  }
}

export class SensitivePersonalInformation {
  @tracked dateOfBirth;
  @tracked ssn;
  @tracked gender;
  @tracked nationalities;

  constructor({
    dateOfBirth = null,
    ssn = '',
    gender = null,
    nationalities = [],
  } = {}) {
    this.dateOfBirth = dateOfBirth;
    this.ssn = ssn;
    this.gender = gender;
    this.nationalities = nationalities;
  }
  isEmpty() {
    return (
      !this?.gender &&
      !this?.dateOfBirth &&
      !this?.nationalities?.length &&
      !this?.ssn
    );
  }
}
