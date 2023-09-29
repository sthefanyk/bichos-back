import { DataSource, Repository } from 'typeorm';
import UserModel from '../../../domain/models/user.model';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { PublishPost } from 'src/@core/application/use-cases/post/publish-post.usecase';
import { Post } from 'src/@core/domain/entities/posts/post';
import PostModel from 'src/@core/domain/models/post.model';
import { PostMapper } from 'src/@core/domain/mappers/post.mapper';

export class PostTypeormRepository implements IPostRepository {
  private postRepo: Repository<PostModel>;
  private userRepo: Repository<UserModel>;

  constructor(private dataSource: DataSource) {
    this.postRepo = this.dataSource.getRepository(PostModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
  }

  async publishPost(entity: Post): PublishPost.Output {

    const user = await this.userRepo.findOne({
       where: { id: entity.getProps().posted_by } 
    });

    const model = PostMapper.getModel(entity, user);

    const post = await this.postRepo.save(model);

    if (!post) {
      throw new Error(`Could not save post`);
    }
    
    return {
      id: post.id
    }
  }
}
