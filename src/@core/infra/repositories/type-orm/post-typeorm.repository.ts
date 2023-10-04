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
import {
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishSponsorshipPost,
} from 'src/@core/application/use-cases/post';
import AnimalSponsorshipModel from 'src/@core/domain/models/animal-sponsorship';
import { AnimalSponsorshipMapper } from 'src/@core/domain/mappers/animal-sponsorship.mapper';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import { FindByIdAdoptPost } from 'src/@core/application/use-cases/post/find-by-id-adopt-post.usecase';
import { FindByIdSponsorshipPost } from 'src/@core/application/use-cases/post/find-by-id-sponsorship-post.usecase';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { PostInactivate } from 'src/@core/application/use-cases/post/inactivate-adopt-post.usecase';

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
    this.animalSponsorshipRepo = this.dataSource.getRepository(
      AnimalSponsorshipModel,
    );
  }

  async findByIdPost(id: string): Promise<PostModel> {
    return this.postRepo.findOne({ where: { id } });
  }

  async inactivate(entity: Post): PostInactivate.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.getProps().posted_by },
    });

    const model = PostMapper.getModel(entity, user);

    const result = await this.postRepo.update(
      model.id, model
    );

    if (result.affected === 0) {
      throw new Error(
        `Could not inactive post with ID ${model.id}`,
      );
    }

    return {
      id: model.id,
      status: model.status,
      type: model.type
    }
  }

  async findByIdAdoptPost(id: string): FindByIdAdoptPost.Output {
    const queryBuilder = this.dataSource.createQueryBuilder();    
    const result = await queryBuilder
      .select([
        'post.*',
        'animal.*',
        'animal_adopt.size',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(AnimalAdoptModel, 'animal_adopt', 'animal.id = animal_adopt.animal_id')
      .where('post.id = :id', { id })
      .getRawOne();
      
    if (!result) {
      throw new NotFoundError('Post not found');
    }

    return AnimalAdoptMapper.getEntityWithJsonData(result);
  }

  async findByIdSponsorshipPost(id: string): FindByIdSponsorshipPost.Output {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select([
        'post.*',
        'animal.*',
        'animal_sponsorship.accompany',
        'animal_sponsorship.reason_request',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(AnimalSponsorshipModel, 'animal_sponsorship', 'animal.id = animal_sponsorship.animal_id')
      .where('post.id = :id', { id })
      .getRawOne();

    if (!result) {
      throw new NotFoundError('Post not found');
    }


    return AnimalSponsorshipMapper.getEntityWithJsonData(result);
  }

  async publishAdoptPost(entity: Post): PublishAdoptPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.getProps().posted_by },
    });

    const model = PostMapper.getModel(entity, user);
    const animalAdoptModel = AnimalAdoptMapper.getModel(
      entity.getProps().animal as any,
    );

    const animal = await this.animalRepo.save(model.animal);
    const animalAdopt = await this.animalAdoptRepo.save(animalAdoptModel);
    const post = await this.postRepo.save(model);

    if (!post || !animal || !animalAdopt) {
      throw new Error(`Could not save post`);
    }

    return {
      id: post.id,
    };
  }

  async publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.getProps().posted_by },
    });

    const model = PostMapper.getModel(entity, user);
    const animalSponsorshipModel = AnimalSponsorshipMapper.getModel(
      entity.getProps().animal as any,
    );

    const animal = await this.animalRepo.save(model.animal);
    const animalSponsorship = await this.animalSponsorshipRepo.save(
      animalSponsorshipModel,
    );
    const post = await this.postRepo.save(model);

    if (!post || !animal || !animalSponsorship) {
      throw new Error(`Could not save post`);
    }

    return {
      id: post.id,
    };
  }

  async findAllAdoptPost(): FindAllAdoptPost.Output {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select([
        'post.*',
        'animal.*',
        'animal_adopt.size',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(AnimalAdoptModel, 'animal_adopt', 'animal.id = animal_adopt.animal_id')
      .where('post.type = :type', { type: TypePost.ADOPTION })
      .getRawMany();

    const entities: Post[] = [];

    result.forEach(async (res) => {
      entities.push(AnimalAdoptMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async findAllSponsorshipPost(): FindAllSponsorshipPost.Output {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select([
        'post.*',
        'animal.*',
        'animal_sponsorship.accompany',
        'animal_sponsorship.reason_request',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(AnimalSponsorshipModel, 'animal_sponsorship', 'animal.id = animal_sponsorship.animal_id')
      .where('post.type = :type', { type: TypePost.SPONSORSHIP })
      .getRawMany();

    const entities: Post[] = [];

    result.forEach(async (res) => {
      entities.push(AnimalSponsorshipMapper.getEntityWithJsonData(res));
    });

    return entities;
  }
}