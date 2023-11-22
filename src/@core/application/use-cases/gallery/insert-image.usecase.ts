import { IGalleryRepository, IUserRepository } from 'src/@core/domain/contracts';
import UseCase from '../usecase';
// import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { Image } from 'src/@core/domain/entities/gallery/image';

export namespace GalleryInsertImageUseCase {
  export class Usecase implements UseCase<Input, Output> {
    constructor(
        private repo: IGalleryRepository,
        private repoUser: IUserRepository,        
    ) {}

    async execute(input: Input): Output {

        const user = await this.repoUser.findUserById(input.owner_id);

        const img = new Image({
            owner: user,
            type: input.type
        });

        return await this.repo.insertImage(img, input.photo);
    }
  }

  export type Input = {
    owner_id: string;
    type: number;
    photo: Express.Multer.File;
  };

  export type Output = Promise<{
    id: string,
    url: string
  }>;
}
