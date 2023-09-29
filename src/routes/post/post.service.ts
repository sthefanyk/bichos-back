import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublishPost } from 'src/@core/application/use-cases/post/publish-post.usecase';

@Injectable()
export class PostService {

  @Inject(PublishPost.Usecase)
  private publishPostUseCase: PublishPost.Usecase;

  async publishPost(data: PublishPost.Input) {
    return this.publishPostUseCase.execute(data);
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
