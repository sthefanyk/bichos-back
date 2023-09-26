import { CustomError } from './error.interface';

export class InvalidCnpjError extends Error implements CustomError {
  public className: string = 'InvalidCnpjError';

  constructor(
    public message: string = 'CNPJ invalid',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
