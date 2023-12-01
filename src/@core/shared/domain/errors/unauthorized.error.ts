import { CustomError } from './error.interface';

export class UnauthorizedError extends Error implements CustomError {
  public className: string = 'UnauthorizedError';

  constructor(
    public message: string = 'Unauthorized',
    public status: number = 401,
  ) {
    super(message);
    this.name = this.className;
  }
}
