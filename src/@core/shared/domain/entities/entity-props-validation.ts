import { ValidationError, validateSync } from 'class-validator';
import { EntityValidationError } from '../errors/validation.error';

export default abstract class EntityPropsValidation {
  validate(props: EntityPropsValidation) {
    const errors = validateSync(props);

    if (errors.length > 0) {
      throw new EntityValidationError(this.formatErrors(errors));
    }
  }

  formatErrors(errors: ValidationError[]) {
    const errorObject = {};

    errors.forEach((error) => {
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
