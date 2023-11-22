import { IsNotEmpty, IsEnum } from 'class-validator';
import { ImageAttr } from './image';
import { ImageType } from 'src/@core/shared/domain/enums/image-type.enum';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import User from '../users/user';

export default class ImageProps extends EntityPropsValidation {
  id: UUID;

  @IsEnum(ImageType)
  @IsNotEmpty()
  type: ImageType;

  owner: User;

  constructor(attr: ImageAttr) {
    super();
    this.id = attr.id ? new UUID(attr.id) : new UUID();
    this.owner = attr.owner;
    this.type = attr.type;
    this.validate(this);
  }
}
