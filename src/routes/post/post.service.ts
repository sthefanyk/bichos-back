import { Injectable, Inject } from '@nestjs/common';
import {
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishAdoptPost,
  PublishSponsorshipPost,
  SearchAdoptPost,
} from 'src/@core/application/use-cases/post';
import { AdoptPostCollectionPresenter } from './adopt-post.presenter';
import { SponsorshipPostCollectionPresenter } from './sponsorship-post.presenter';
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase copy';

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

  @Inject(SearchAdoptPost.Usecase)
  private searchAdoptPostUseCase: SearchAdoptPost.Usecase;

  @Inject(SearchSponsorshipPost.Usecase)
  private searchSponsorshipPostUseCase: SearchSponsorshipPost.Usecase;

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

  async searchAdoptPost(searchParams: SearchAdoptPost.Input) {
    const output = await this.searchAdoptPostUseCase.execute(searchParams);
    return new AdoptPostCollectionPresenter(output);
  }

  async searchSponsorshipPost(searchParams: SearchSponsorshipPost.Input) {
    const output = await this.searchSponsorshipPostUseCase.execute(searchParams);
    return new SponsorshipPostCollectionPresenter(output);
  }
}
