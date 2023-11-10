import { CustomError } from './error.interface';

export class InsertError extends Error implements CustomError {
  public className: string = 'InsertError';

  constructor(
    public message: string = 'Error when entering data',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
