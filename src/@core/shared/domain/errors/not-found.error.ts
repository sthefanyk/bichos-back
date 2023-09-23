import { CustomError } from './error.interface';

export class NotFoundError extends Error implements CustomError {
  public className: string = 'NotFoundError';

  constructor(
    public message: string = 'Not Found',
    public status: number = 404,
  ) {
    super(message);
    this.name = this.className;
  }
}
