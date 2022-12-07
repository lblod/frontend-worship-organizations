import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { createValidatedChangeset } from 'frontend-worship-organizations/utils/changeset';
import contactValidations from 'frontend-worship-organizations/validations/contact-point';
import secondaryContactValidations from 'frontend-worship-organizations/validations/secondary-contact-point';
import { getAddressValidations } from 'frontend-worship-organizations/validations/address';
import {
  createPrimaryContact,
  createSecondaryContact,
} from 'frontend-worship-organizations/models/contact-point';

export default class ContactDetailsComponent extends Component {
  @tracked editingContact;
  @tracked positions;
  @tracked singlePosition = false;
  @tracked selectedContact;
  @tracked oldContactId;
  @tracked isNew;
  @service store;
  @service router;
  @service contactDetails;

  constructor() {
    super(...arguments);
    if (this.args.contact?.primaryContact?.id) {
      this.selectedContact = this.args.contact;
      this.oldContactId = this.args.contact.primaryContact.id; // keep track of old primary contact
    }
    this.positions = this.reloadPositions();
    if (!this.positions?.length) {
      if (this.selectedContact) {
        this.fixErrorAndSelect(this.selectedContact);
      } else {
        this.newContact();
      }
      this.args.onUpdate(this.editingContact);

      this.singlePosition = true;
    } else {
      this.singlePosition = false;
    }
  }

  reloadPositions() {
    const positions = [];
    if (this.args.positions) {
      for (const cp of this.args.positions) {
        if (
          cp.primaryContact &&
          !positions.some((p) => p.primaryContact?.id === cp.primaryContact.id)
        ) {
          positions.push(cp);
        }
      }
    }
    return positions;
  }

  @action
  cancel() {
    this.rollback(this.editingContact);
    this.editingContact = null;
  }

  rollback(contact) {
    if (contact) {
      const { primaryContact, secondaryContact, address } = contact;
      if (primaryContact) {
        primaryContact.rollback();
      }
      if (address) {
        address.rollback();
      }
      if (secondaryContact) {
        secondaryContact.rollback();
      }
    }
  }
  @action
  fixErrorAndSelect(contact) {
    this.isNew = false;
    if (this.selectedContact?.position.id !== contact.position.id) {
      this.rollback(this.selectedContact); // rollback the previous selected contact
    }

    let { primaryContact, secondaryContact, address, position, title } =
      contact;
    if (!primaryContact) {
      const pc = createPrimaryContact(this.store);
      position.contacts.pushObject(pc);
      primaryContact = createValidatedChangeset(pc, contactValidations);
    }
    if (!secondaryContact) {
      const sc = createSecondaryContact(this.store);
      position.contacts.pushObject(sc);
      secondaryContact = createValidatedChangeset(
        sc,
        secondaryContactValidations
      );
    }
    if (!address) {
      const addr = this.store.createRecord('address');
      primaryContact.contactAddress = addr;
      address = createValidatedChangeset(addr, getAddressValidations());
    }

    this.editingContact = {
      primaryContact,
      secondaryContact,
      address,
      position,
      title,
    };
    this.args.onUpdate(this.editingContact);
  }

  @action
  async newContact() {
    this.isNew = true;
    let { position, title } = this.args.contact;
    let primaryContact = createPrimaryContact(this.store);
    let secondaryContact = createSecondaryContact(this.store);
    let address = this.store.createRecord('address');
    primaryContact.contactAddress = address;
    const editing = {
      position,
      title,
      primaryContact: createValidatedChangeset(
        primaryContact,
        contactValidations
      ),
      secondaryContact: createValidatedChangeset(
        secondaryContact,
        secondaryContactValidations
      ),
      address: createValidatedChangeset(address, getAddressValidations()),
    };
    this.editingContact = editing;
    this.args.onUpdate(this.editingContact);
  }

  @dropTask
  *copy(computedPosition) {
    let { primaryContact, secondaryContact, address } = computedPosition;
    let { position, title } = this.args.contact;
    position.contacts.clear();
    if (!primaryContact) {
      const pc = createPrimaryContact(this.store);
      primaryContact = createValidatedChangeset(pc, contactValidations);
    }
    if (!address) {
      const addr = this.store.createRecord('address');
      primaryContact.contactAddress = addr;
      address = createValidatedChangeset(addr, getAddressValidations());
    }
    if (!secondaryContact) {
      const sc = createSecondaryContact(this.store);
      secondaryContact = createValidatedChangeset(
        sc,
        secondaryContactValidations
      );
    }
    yield secondaryContact.validate();
    yield primaryContact.validate();
    yield address.validate();

    position.contacts.pushObject(primaryContact);
    position.contacts.pushObject(secondaryContact);
    const copied = {
      position,
      title,
      primaryContact,
      secondaryContact,
      address,
    };

    yield Promise.all([
      address.validate(),
      secondaryContact.validate(),
      primaryContact.validate(),
    ]);

    if (
      !primaryContact.isValid ||
      !secondaryContact.isValid ||
      !address.isValid
    ) {
      this.fixErrorAndSelect(copied);
    } else {
      this.selectedContact = copied;
      this.args.onUpdate(this.selectedContact);
    }
  }

  get isAllFieldsEmpty() {
    return this.contactDetails.isAllFieldsEmpty(this.editingContact);
  }

  get isSelectedContactNewContact() {
    return this.positions.some((pos) => !pos.primaryContact?.id);
  }
}
