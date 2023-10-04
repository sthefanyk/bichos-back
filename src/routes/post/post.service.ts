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
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase';
import { FindByIdAdoptPost } from 'src/@core/application/use-cases/post/find-by-id-adopt-post.usecase';
import { FindByIdSponsorshipPost } from 'src/@core/application/use-cases/post/find-by-id-sponsorship-post.usecase';
import { PostInactivate } from 'src/@core/application/use-cases/post/inactivate-adopt-post.usecase';

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

  @Inject(FindByIdAdoptPost.Usecase)
  private findByIdAdoptPostUseCase: FindByIdAdoptPost.Usecase;

  @Inject(FindByIdSponsorshipPost.Usecase)
  private findByIdSponsorshipPostUseCase: FindByIdSponsorshipPost.Usecase;

  @Inject(PostInactivate.Usecase)
  private postInactivateUseCase: PostInactivate.Usecase;

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

  async findByIdAdoptPost(data: FindByIdAdoptPost.Input) {
    return this.findByIdAdoptPostUseCase.execute(data);
  }

  async findByIdSponsorshipPost(data: FindByIdSponsorshipPost.Input) {
    return this.findByIdSponsorshipPostUseCase.execute(data);
  }

  async inactivatePost(id: string, data: PostInactivate.Input) {
    return await this.postInactivateUseCase.execute({id, ...data});
  }
}
