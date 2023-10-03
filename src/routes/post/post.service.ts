import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublishAdoptPost, PublishSponsorshipPost } from 'src/@core/application/use-cases/post';

@Injectable()
export class PostService {

  @Inject(PublishAdoptPost.Usecase)
  private publishAdoptPostUseCase: PublishAdoptPost.Usecase;

  @Inject(PublishSponsorshipPost.Usecase)
  private publishSponsorshipPostUseCase: PublishSponsorshipPost.Usecase;

  async publishAdoptPost(data: PublishAdoptPost.Input) {
    return this.publishAdoptPostUseCase.execute(data);
  }

  async publishSponsorshipPost(data: PublishSponsorshipPost.Input) {
    return this.publishSponsorshipPostUseCase.execute(data);
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
