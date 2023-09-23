import { CustomError } from './error.interface';

export class AlreadyExistsError extends Error implements CustomError {
  public className: string = 'AlreadyExistsError';

  constructor(
    public message: string = 'Resource already exists',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
