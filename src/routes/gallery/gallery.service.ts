import { Injectable, Inject } from '@nestjs/common';
import { GalleryGetImageUrlUseCase, GalleryInsertImageUseCase } from 'src/@core/application/use-cases/gallery';

@Injectable()
export class GalleryService {
  @Inject(GalleryInsertImageUseCase.Usecase)
  private insertImageUseCase: GalleryInsertImageUseCase.Usecase;

  @Inject(GalleryGetImageUrlUseCase.Usecase)
  private getImageUrlUseCase: GalleryGetImageUrlUseCase.Usecase;

  async insertImage(data: GalleryInsertImageUseCase.Input) {
    return this.insertImageUseCase.execute(data);
  }

  async getImageUrl(data: GalleryGetImageUrlUseCase.Input) {
    return this.getImageUrlUseCase.execute(data);
  }
}
