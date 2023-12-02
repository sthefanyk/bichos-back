import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { ImageType } from 'src/@core/shared/domain/enums/image-type.enum';

@Entity('gallery')
export class GalleryModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'enum', enum: ImageType })
  type: ImageType;
}
