import { IGalleryRepository } from '../../../domain/contracts';
import UseCase from '../usecase';
import { Image } from '../../../domain/entities/gallery/image';

export namespace GalleryInsertImageUseCase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IGalleryRepository) {}

    async execute(input: Input): Output {
      const img = new Image({
        type: +input.type,
      });

      return await this.repo.insertImage(img, input.photo);
    }
  }

  export type Input = {
    type: string;
    photo: Express.Multer.File;
  };

  export type Output = Promise<{
    id: string;
    url: string;
  }>;
}
