import { CustomError } from './error.interface';

export class EntityValidationError extends Error implements CustomError {
  public className: string = 'EntityValidationError';

  constructor(
    public message,
    public status: number = 400,
  ) {
    super(message || 'Validation Error');
    this.name = this.className;
  }
}