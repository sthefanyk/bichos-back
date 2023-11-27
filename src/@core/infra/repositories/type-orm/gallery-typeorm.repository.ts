import { GalleryFindImageByIdUseCase, GalleryGetImageUrlUseCase, GalleryInsertImageUseCase } from 'src/@core/application/use-cases/gallery';
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
    const name = id + '.png';
    const time = 3 * 60 * 60;

    const result = await supabase.storage.from("profile").createSignedUrl(name, time);

    if (!result.data) {
      return null
    }

    return {
      url: result.data.signedUrl
    }
  }

  async findImageById(id: string): GalleryFindImageByIdUseCase.Output {
    const model = await this.repo.findOne({ 
      where: { id }
    });
    
    if (!model) return null;

    return new Image({ 
      id: model.id,
      type: +model.type
    });
  }

  async removeImage(id: string): Promise<boolean> {
    const name = id + '.png';
  
    const { error } = await supabase.storage.from("profile").remove([name]);

    const image = await this.findImageById(id);

    await this.repo.remove({
      id: image.id,
      type: image.type
    });
  
    if (error) {
      return false;
    }

    return true;
  }
  
}
