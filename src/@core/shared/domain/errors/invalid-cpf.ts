import { CustomError } from './error.interface';

export class InvalidCpfError extends Error implements CustomError {
  public className: string = 'InvalidCpfError';

  constructor(
    public message: string = 'CPF invalid',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
