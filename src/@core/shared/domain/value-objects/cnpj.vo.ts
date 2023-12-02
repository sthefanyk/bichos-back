import { InvalidCnpjError } from '../errors/invalid-cnpj';

export default class CNPJ {
  constructor(private value: string) {
    // if (!this.validate(this.cnpj)) throw new InvalidCnpjError();
  }

  public get cnpj(): string {
    return this.value;
  }

  private validate(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i];
    }

    const remainder1 = sum % 11;
    const digit1 = remainder1 < 2 ? 0 : 11 - remainder1;

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i];
    }

    const remainder2 = sum % 11;
    const digit2 = remainder2 < 2 ? 0 : 11 - remainder2;

    if (
      parseInt(cnpj.charAt(12)) !== digit1 ||
      parseInt(cnpj.charAt(13)) !== digit2
    ) {
      return false;
    }

    this.value = cnpj;
    return true;
  }
}
