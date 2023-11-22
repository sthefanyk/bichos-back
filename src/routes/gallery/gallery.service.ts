import { Injectable, Inject } from '@nestjs/common';
import { GalleryInsertImageUseCase } from 'src/@core/application/use-cases/gallery';

@Injectable()
export class GalleryService {
  @Inject(GalleryInsertImageUseCase.Usecase)
  private insertImageUseCase: GalleryInsertImageUseCase.Usecase;

  async insertImage(data: GalleryInsertImageUseCase.Input) {
    return this.insertImageUseCase.execute(data);
  }
}
