import { IGalleryRepository } from 'src/@core/domain/contracts';
import UseCase from '../usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';

export namespace GalleryGetImageUrlUseCase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IGalleryRepository) {}

    async execute(input: Input): Output {
      const url = await this.repo.getImageUrl(input.id);

      if (!url) throw new NotFoundError('Image not found');

      return url;
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = Promise<{
    url: string;
  }>;
}
