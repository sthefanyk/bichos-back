import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../errors/invalid-uuid.error';

export default class UUID {
  constructor(private value?: string) {
    if (!this.value) {
      this.value = uuid();
    }

    this.validate();
  }

  public get id(): string {
    return this.value;
  }

  getIdString(): string {
    return this.value.toString();
  }

  private validate() {
    const isValid = uuidValidate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
