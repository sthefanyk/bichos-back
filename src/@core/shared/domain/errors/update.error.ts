import { CustomError } from './error.interface';

export class UpdateError extends Error implements CustomError {
  public className: string = 'UpdateError';

  constructor(
    public message: string = 'Error updating data',
    public status: number = 400,
  ) {
    super(message);
    this.name = this.className;
  }
}
