import { DataSource, Repository } from 'typeorm';
import UserModel from '../../../domain/models/user.model';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { PublishAdoptPost } from 'src/@core/application/use-cases/post/publish-adopt-post.usecase';
import { Post } from 'src/@core/domain/entities/posts/post';
import PostModel from 'src/@core/domain/models/post.model';
import { PostMapper } from 'src/@core/domain/mappers/post.mapper';
import AnimalModel from 'src/@core/domain/models/animal.model';
import AnimalAdoptModel from 'src/@core/domain/models/animal-adopt';
import { AnimalAdoptMapper } from 'src/@core/domain/mappers/animal-adopt.mapper';
import { PublishSponsorshipPost } from 'src/@core/application/use-cases/post';
import AnimalSponsorshipModel from 'src/@core/domain/models/animal-sponsorship';
import { AnimalSponsorshipMapper } from 'src/@core/domain/mappers/animal-sponsorship.mapper';

export class PostTypeormRepository implements IPostRepository {
  private postRepo: Repository<PostModel>;
  private userRepo: Repository<UserModel>;
  private animalRepo: Repository<AnimalModel>;
  private animalAdoptRepo: Repository<AnimalAdoptModel>;
  private animalSponsorshipRepo: Repository<AnimalSponsorshipModel>;

  constructor(private dataSource: DataSource) {
    this.postRepo = this.dataSource.getRepository(PostModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
    this.animalRepo = this.dataSource.getRepository(AnimalModel);
    this.animalAdoptRepo = this.dataSource.getRepository(AnimalAdoptModel);
    this.animalSponsorshipRepo = this.dataSource.getRepository(AnimalSponsorshipModel);
  }
  async publishAdoptPost(entity: Post): PublishAdoptPost.Output {

    const user = await this.userRepo.findOne({
       where: { id: entity.getProps().posted_by } 
    });

    const model = PostMapper.getModel(entity, user);
    const animalAdoptModel = AnimalAdoptMapper.getModel(entity.getProps().animal as any);

    const animal = await this.animalRepo.save(model.animal);
    const animalAdopt = await this.animalAdoptRepo.save(animalAdoptModel);
    const post = await this.postRepo.save(model);

    if (!post || !animal || !animalAdopt) {
      throw new Error(`Could not save post`);
    }
    
    return {
      id: post.id
    }
  }

  async publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.getProps().posted_by } 
    });

    const model = PostMapper.getModel(entity, user);
    const animalSponsorshipModel = AnimalSponsorshipMapper.getModel(entity.getProps().animal as any);

    const animal = await this.animalRepo.save(model.animal);
    const animalSponsorship = await this.animalSponsorshipRepo.save(animalSponsorshipModel);
    const post = await this.postRepo.save(model);

    if (!post || !animal || !animalSponsorship) {
      throw new Error(`Could not save post`);
    }
    
    return {
      id: post.id
    }
  }
}
