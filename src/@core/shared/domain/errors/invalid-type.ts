import { CustomError } from './error.interface';

export class InvalidTypeError extends Error implements CustomError {
  public className: string = 'InvalidTypeError';

  constructor(
    public message: string = 'Type invalid',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
