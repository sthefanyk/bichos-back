import { Injectable, Inject } from '@nestjs/common';
import {
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishAdoptPost,
  PublishSponsorshipPost,
} from 'src/@core/application/use-cases/post';

@Injectable()
export class PostService {
  @Inject(PublishAdoptPost.Usecase)
  private publishAdoptPostUseCase: PublishAdoptPost.Usecase;

  @Inject(PublishSponsorshipPost.Usecase)
  private publishSponsorshipPostUseCase: PublishSponsorshipPost.Usecase;

  @Inject(FindAllAdoptPost.Usecase)
  private findAllAdoptPostUseCase: FindAllAdoptPost.Usecase;

  @Inject(FindAllSponsorshipPost.Usecase)
  private findAllSponsorshipPostUseCase: FindAllSponsorshipPost.Usecase;

  async publishAdoptPost(data: PublishAdoptPost.Input) {
    return this.publishAdoptPostUseCase.execute(data);
  }

  async publishSponsorshipPost(data: PublishSponsorshipPost.Input) {
    return this.publishSponsorshipPostUseCase.execute(data);
  }

  async findAllAdoptPost() {
    return this.findAllAdoptPostUseCase.execute();
  }

  async findAllSponsorshipPost() {
    return this.findAllSponsorshipPostUseCase.execute();
  }
}
