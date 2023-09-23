import { CustomError } from './error.interface';

export class InvalidUuidError extends Error implements CustomError {
  public className: string = 'InvalidUuidError';

  constructor(
    public message: string = 'ID must be a valid UUID',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
