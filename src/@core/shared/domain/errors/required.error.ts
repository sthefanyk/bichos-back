import { CustomError } from './error.interface';

export class RequiredError extends Error implements CustomError {
  public className: string = 'RequiredError';

  constructor(
    public message: string,
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
    this.message = `${this.message} required`;
  }
}
