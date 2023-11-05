import { CustomError } from './error.interface';

export class SingInError extends Error implements CustomError {
  public className: string = 'SingInError';

  constructor(
    public message: string = 'Email and/or password are incorrect',
    public status: number = 404,
  ) {
    super(message);
    this.name = this.className;
  }
}
