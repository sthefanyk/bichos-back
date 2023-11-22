import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { ImageType } from 'src/@core/shared/domain/enums/image-type.enum';
import ImageProps from './image-props';
import User from '../users/user';

export type ImageAttr = {
    id?: string;
    owner: User;
    type: ImageType;
};

export class Image implements EntityMarker {
  private imageProps: ImageProps;

  constructor(private imageAttr: ImageAttr) {
    imageAttr.type = +imageAttr.type;
    this.imageProps = new ImageProps(this.imageAttr);
  }

  toJson() {
    return {  
      id: this.id,
      owner: this.owner,
      type: this.type,
    };
  }

  get id(): string {
    return this.imageProps.id.id;
  }

  get owner(): User {
    return this.imageProps.owner;
  }

  get type(): ImageType {
    return this.imageProps.type;
  }
}
