import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { UserModel } from '.';
import { ImageType } from 'src/@core/shared/domain/enums/image-type.enum';

@Entity('gallery')
export class GalleryModel implements ModelMarker {
    @PrimaryColumn()
    id: string;
  
    @ManyToOne(() => UserModel, (user) => user)
    @JoinColumn({name: 'user'})
    owner: UserModel;

    @Column({ type: 'enum', enum: ImageType })
    type: ImageType;
}