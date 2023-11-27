import { Injectable, Inject } from '@nestjs/common';
import { GalleryGetImageUrlUseCase, GalleryInsertImageUseCase, GalleryRemoveImageUseCase } from 'src/@core/application/use-cases/gallery';

@Injectable()
export class GalleryService {
  @Inject(GalleryInsertImageUseCase.Usecase)
  private insertImageUseCase: GalleryInsertImageUseCase.Usecase;

  @Inject(GalleryGetImageUrlUseCase.Usecase)
  private getImageUrlUseCase: GalleryGetImageUrlUseCase.Usecase;

  @Inject(GalleryRemoveImageUseCase.Usecase)
  private removeImageUseCase: GalleryRemoveImageUseCase.Usecase;

  async insertImage(data: GalleryInsertImageUseCase.Input) {
    return this.insertImageUseCase.execute(data);
  }

  async getImageUrl(data: GalleryGetImageUrlUseCase.Input) {
    return this.getImageUrlUseCase.execute(data);
  }

  async removeImage(data: GalleryRemoveImageUseCase.Input) {
    return this.removeImageUseCase.execute(data);
  }
}
