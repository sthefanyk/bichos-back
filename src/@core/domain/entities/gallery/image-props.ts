import { IsNotEmpty, IsEnum } from 'class-validator';
import { ImageAttr } from './image';
import { ImageType } from '../../../shared/domain/enums/image-type.enum';
import EntityPropsValidation from '../../../shared/domain/entities/entity-props-validation';
import UUID from '../../../shared/domain/value-objects/uuid.vo';

export default class ImageProps extends EntityPropsValidation {
  id: UUID;

  @IsEnum(ImageType)
  @IsNotEmpty()
  type: ImageType;

  constructor(attr: ImageAttr) {
    super();
    this.id = attr.id ? new UUID(attr.id) : new UUID();
    this.type = attr.type;
    this.validate(this);
  }
}
