import { ValidationError } from 'class-validator';
import { EntityValidationError } from '../errors/validation-error';
import EntityProps from './entity-props';

export default abstract class Entity<T extends EntityProps> {
  constructor(protected props: T) {
    this.validateProps();
  }

  async validateProps() {
    const errors = await this.props.validate(this.props);

    
    if (errors.length > 0) {
      console.log(errors);
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

  get<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }

  getProps() {
    return this.props;
  }

  toJson() {
    return { ...this.props, id: this.props.id.toString() }
  }  

  toJsonString(): string {
    const propsWithId = { ...this.props, id: this.props.id.toString() };
    return JSON.stringify(propsWithId);
  }
}
