import { IGalleryRepository } from 'src/@core/domain/contracts';
import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { Image } from 'src/@core/domain/entities/gallery/image';

export namespace GalleryFindImageByIdUseCase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IGalleryRepository) {}

    async execute(input: Input): Output {
      const img = await this.repo.findImageById(input.id);

      if (!img) throw new NotFoundError('Image not found');

      return img;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<Image>;
}
