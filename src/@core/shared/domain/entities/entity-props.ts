import { ValidationError, validateSync } from 'class-validator';
import UUID from '../value-objects/uuid.vo';
import { EntityValidationError } from '../errors/validation.error';

export default abstract class EntityProps {
  id: UUID;

  created_at: Date;

  updated_at: Date | null;

  deleted_at: Date | null;

  constructor(
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    this.id = id ? new UUID(id) : new UUID();
    this.created_at = created_at ?? new Date();
    this.updated_at = updated_at ?? null;
    this.deleted_at = deleted_at ?? null;
  }

  validate(props: EntityProps) {
    const errors = validateSync(props);

    if (errors.length > 0) {
      throw new EntityValidationError(this.formatErrors(errors));
    }
  }

  formatErrors(errors: ValidationError[]){
    const errorObject = {};

    errors.forEach(error => {
      const propertyName = error.property;
      const errorMessages = Object.values(error.constraints);
    
      if (!errorObject[propertyName]) {
        errorObject[propertyName] = [];
      }
      errorObject[propertyName].push(...errorMessages);
    });

    return errorObject;
  }
}