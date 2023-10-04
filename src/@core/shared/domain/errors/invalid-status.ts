import { CustomError } from './error.interface';

export class InvalidStatusError extends Error implements CustomError {
  public className: string = 'InvalidStatusError';

  constructor(
    public message: string = 'Status invalid',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
