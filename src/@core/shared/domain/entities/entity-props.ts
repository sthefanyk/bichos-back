import { ValidationError, validate } from 'class-validator';
import UUID from '../value-objects/uuid.vo';
import ClassValidatorFields from '../validators/class-validator-fields';

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

  async validate(props: EntityProps): Promise<ValidationError[]> {
    return await validate(props);
  }

  static create() {
    return new Validator();
  }
}

export class Validator extends ClassValidatorFields<EntityProps> {
  validate(data: EntityProps): boolean {
    return super.validate(data);
  }
}

export class ValidatorFactory {
  static create() {
    return new Validator();
  }
}