import { IGalleryRepository } from 'src/@core/domain/contracts';
import UseCase from '../usecase';

export namespace GalleryRemoveImageUseCase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(private repo: IGalleryRepository) {}

    async execute(input: Input): Output {
      return await this.repo.removeImage(input.id);
    }
  }

  export type Input = {
    id: string 
  };

  export type Output = Promise<boolean>;
}
