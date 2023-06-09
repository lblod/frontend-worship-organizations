import Service, { inject as service } from '@ember/service';

import { isActivePosition } from 'frontend-worship-organizations/utils/position';
import {
  findPrimaryContact,
  findSecondaryContact,
} from 'frontend-worship-organizations/models/contact-point';

export default class ContactDetailsService extends Service {
  @service store;

  async ministerToPosition(minister, onlyActivePosition = true) {
    if (onlyActivePosition && !isActivePosition(minister.agentEndDate)) {
      return null;
    }
    const position = await minister.position;
    const role = await position.function;
    const administrativeUnit = await position.worshipService;
    const mContacts = await minister.contacts;
    const primaryContact = findPrimaryContact(mContacts);
    const secondaryContact = findSecondaryContact(mContacts);
    return {
      position: minister,
      title: `${role.label}, ${administrativeUnit.name}`,
      role: role.label,
      type: 'minister',
      id: minister.id,
      startDate: minister.agentStartDate,
      endDate: minister.agentEndDate,
      administrativeUnit,
      primaryContact: primaryContact,
      secondaryContact: secondaryContact,
    };
  }

  async mandatoryToPosition(mandatory, onlyActivePosition = true) {
    const mandate = await mandatory.mandate;
    if (onlyActivePosition && !isActivePosition(mandatory.endDate)) {
      return null;
    }
    const role = await mandate.roleBoard;
    const governingBody = await mandate.governingBody;
    const isTimeSpecializationOf = await governingBody.isTimeSpecializationOf;
    const administrativeUnit = await isTimeSpecializationOf.administrativeUnit;
    const mContacts = await mandatory.contacts;
    const primaryContact = findPrimaryContact(mContacts);
    const secondaryContact = findSecondaryContact(mContacts);
    return {
      position: mandatory,
      title: `${role.label}, ${administrativeUnit.name}`,
      role: role.label,
      type: 'mandatory',
      id: mandatory.id,
      startDate: mandatory.startDate,
      endDate: mandatory.endDate,
      administrativeUnit,
      primaryContact: primaryContact,
      secondaryContact: secondaryContact,
    };
  }

  async agentToPosition(agent, onlyActivePosition = true) {
    const boardPosition = await agent.boardPosition;
    if (onlyActivePosition && !isActivePosition(agent.endDate)) {
      return null;
    }
    const role = await boardPosition.roleBoard;
    const governingBodies = await boardPosition.governingBodies;

    let administrativeUnits = [];
    for (const governingBody of governingBodies.toArray()) {
      const isTimeSpecializationOf = await governingBody.isTimeSpecializationOf;
      const administrativeUnit =
        await isTimeSpecializationOf.administrativeUnit;
      administrativeUnits.push(administrativeUnit);
    }

    const mContacts = await boardPosition.contacts;
    return {
      position: agent,
      title: `${role.label}, ${administrativeUnits[0].name}`,
      role: role.label,
      type: 'agent',
      id: agent.id,
      startDate: agent.startDate,
      endDate: agent.endDate,
      administrativeUnits,
      primaryContact: mContacts,
    };
  }

  async getPersonAndAllPositions(personId) {
    let person = await this.store.findRecord('person', personId, {
      reload: true,
    });
    const positions = [];

    const mandatories = (await person.mandatories).toArray(); // mandatarissen
    const agents = (await person.agents).toArray(); // leidinggevenden
    const ministers = (await person.agentsInPosition).toArray(); // bedinaren

    for (let mandatory of mandatories) {
      const position = await this.mandatoryToPosition(mandatory);
      if (position) {
        positions.push(position);
      }
    }

    for (let agent of agents) {
      const position = await this.agentToPosition(agent);
      if (position) {
        positions.push(position);
      }
    }

    for (let minister of ministers) {
      const position = await this.ministerToPosition(minister);
      if (position) {
        positions.push(position);
      }
    }

    return {
      person,
      positions: positions.sort((a, b) => {
        return b.startDate - a.startDate;
      }),
    };
  }
}
