import { GalleryGetImageUrlUseCase, GalleryInsertImageUseCase } from 'src/@core/application/use-cases/gallery';
import { IGalleryRepository } from 'src/@core/domain/contracts';
import { Image } from 'src/@core/domain/entities/gallery/image';
import { GalleryModel } from 'src/@core/domain/models';
import supabase from 'src/database/supabase/config';
import { DataSource, Repository } from 'typeorm';

export class GalleryTypeormRepository implements IGalleryRepository {
  private repo: Repository<GalleryModel>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(GalleryModel);
  }

  async insertImage(entity: Image, photo: Express.Multer.File): GalleryInsertImageUseCase.Output {

    const name = entity.id + '.png';
    
    await supabase.storage.from("profile").upload(name, photo.buffer, {
      upsert: true,
    })

    const result = await supabase.storage.from("profile").createSignedUrl(name, (5 * 60));

    const image = await this.repo.save(entity.toJson());

    if (!image) {
      return null
    }

    return {
      id: entity.id,
      url: result.data.signedUrl
    }
  }

  async getImageUrl(id: string): GalleryGetImageUrlUseCase.Output {
    const time = 3 * 60 * 60;

    const result = await supabase.storage.from("profile").createSignedUrl(id, time);

    if (!result.data.signedUrl) {
      return null
    }

    return {
      url: result.data.signedUrl
    }
  }
  
}
