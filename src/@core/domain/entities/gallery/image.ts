import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { ImageType } from 'src/@core/shared/domain/enums/image-type.enum';
import ImageProps from './image-props';

export type ImageAttr = {
    id?: string;
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
      type: this.type,
    };
  }

  get id(): string {
    return this.imageProps.id.id;
  }

  get type(): ImageType {
    return this.imageProps.type;
  }
}
