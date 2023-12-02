export default class Phone {
  constructor(private value: string) {
    // if (!this.validate(this.phone)) throw new InvalidPhoneError();
  }

  public get phone(): string {
    return this.value;
  }

  private validate(phone: string): boolean {
    // validar

    this.value = phone;
    return true;
  }
}
