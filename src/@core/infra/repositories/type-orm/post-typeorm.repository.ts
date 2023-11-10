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
import AnimalHasPersonalityModel from 'src/@core/domain/models/animal-has-personality';
import { Personality } from 'src/@core/domain/entities/personality';
import PersonalityModel from 'src/@core/domain/models/personality.model';
import BreedModel from 'src/@core/domain/models/breed.model';
import { Need } from 'src/@core/domain/entities/need';
import AnimalHasNeedModel from 'src/@core/domain/models/animal-has-need';
import NeedModel from 'src/@core/domain/models/need.model';
import DiseaseAllergyModel from 'src/@core/domain/models/disease-allergy.model';
import HealthModel from 'src/@core/domain/models/health.model';
import VaccineMedicineModel from 'src/@core/domain/models/vaccine-medicine.model';
import DoseModel from 'src/@core/domain/models/dose.model';

export class PostTypeormRepository implements IPostRepository {
  private postRepo: Repository<PostModel>;
  private userRepo: Repository<UserModel>;
  private animalRepo: Repository<AnimalModel>;
  private animalAdoptRepo: Repository<AnimalAdoptModel>;
  private animalSponsorshipRepo: Repository<AnimalSponsorshipModel>;
  private animalHasPersonalityRepo: Repository<AnimalHasPersonalityModel>;
  private animalHasNeedRepo: Repository<AnimalHasNeedModel>;
  private personalityRepo: Repository<PersonalityModel>;
  private needRepo: Repository<NeedModel>;
  private breedRepo: Repository<BreedModel>;
  private healthRepo: Repository<HealthModel>;
  private diseaseAllergyRepo: Repository<DiseaseAllergyModel>;
  private vaccineMedicineRepo: Repository<VaccineMedicineModel>;
  private doseRepo: Repository<DoseModel>;

  constructor(private dataSource: DataSource) {
    this.postRepo = this.dataSource.getRepository(PostModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
    this.animalRepo = this.dataSource.getRepository(AnimalModel);
    this.animalAdoptRepo = this.dataSource.getRepository(AnimalAdoptModel);
    this.animalSponsorshipRepo = this.dataSource.getRepository(
      AnimalSponsorshipModel,
    );
    this.animalHasPersonalityRepo = this.dataSource.getRepository(
      AnimalHasPersonalityModel,
    );
    this.animalHasNeedRepo = this.dataSource.getRepository(AnimalHasNeedModel);
    this.personalityRepo = this.dataSource.getRepository(PersonalityModel);
    this.needRepo = this.dataSource.getRepository(NeedModel);
    this.breedRepo = this.dataSource.getRepository(BreedModel);
    this.healthRepo = this.dataSource.getRepository(HealthModel);
    this.diseaseAllergyRepo = this.dataSource.getRepository(DiseaseAllergyModel);
    this.vaccineMedicineRepo = this.dataSource.getRepository(VaccineMedicineModel);
    this.doseRepo = this.dataSource.getRepository(DoseModel);
  }

  async findByIdPost(id: string): Promise<PostModel> {
    return this.postRepo.findOne({ where: { id } });
  }

  async inactivate(entity: Post): PostInactivate.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const model = PostMapper.getModel(entity, user);

    const result = await this.postRepo.update(model.id, model);

    if (result.affected === 0) {
      throw new Error(`Could not inactive post with ID ${model.id}`);
    }

    return {
      id: model.id,
      status: model.status,
      type: model.type,
    };
  }

  async findByIdAdoptPost(id: string): FindByIdAdoptPost.Output {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select([
        'post.*',
        'animal.*',
        'animal_adopt.size_current',
        'animal_adopt.size_estimated',
        'animal_adopt.breed',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(
        AnimalAdoptModel,
        'animal_adopt',
        'animal.id = animal_adopt.animal_id',
      )
      .where('post.id = :id', { id })
      .getRawOne();

    if (!result) {
      throw new NotFoundError('Post not found');
    }

    result.personalities = await this.getPersonalities(result.animal);
    
    result.health = await this.healthRepo.findOne({where: {id_animal: result.animal}});
    result.health.disease_allergy = await this.diseaseAllergyRepo.find({where: {id_animal: result.animal}});
    const animal = await this.animalRepo.findOne({where: {id: result.animal}});
    result.health.vaccines_medicines = await this.vaccineMedicineRepo.find({where: {id_animal: animal.id}});
    
    for (const item of result.health.vaccines_medicines) {
      item.doses = await this.doseRepo.find({ where: { id_vaccine_medicine: item.id } });
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
      .innerJoin(
        AnimalSponsorshipModel,
        'animal_sponsorship',
        'animal.id = animal_sponsorship.animal_id',
      )
      .where('post.id = :id', { id })
      .getRawOne();

    if (!result) {
      throw new NotFoundError('Post not found');
    }

    result.personalities = await this.getPersonalities(result.animal);
    result.needs = await this.getNeeds(result.animal);

    return AnimalSponsorshipMapper.getEntityWithJsonData(result);
  }

  async publishAdoptPost(entity: Post): PublishAdoptPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const model = PostMapper.getModel(entity, user);
    const animalAdoptModel = AnimalAdoptMapper.getModel(entity.animal as any);

    const animal = await this.animalRepo.save(model.animal);
    const animalAdopt = await this.animalAdoptRepo.save(animalAdoptModel);
    const post = await this.postRepo.save(model);

    await this.addPersonalities(entity.animal.personalities, animal.id);

    const health = (entity.animal as any).health;

    await this.healthRepo.save({
      id_animal: animal.id,
      additional: health.additional,
      neutered: health.neutered,
    });

    for (const disease_allergy of health.disease_allergy) {
      await this.diseaseAllergyRepo.save({
        id_animal: animal.id,
        name: disease_allergy.name,
        description: disease_allergy.description,
        type: disease_allergy.type
      });
    }
    
    for (const vaccines_medicines of health.vaccines_medicines) {
      const vm = await this.vaccineMedicineRepo.save({
        id: vaccines_medicines.id,
        id_animal: animal.id,
        name: vaccines_medicines.name,
        type: vaccines_medicines.type,
        total_dose: vaccines_medicines.total_dose,
      });

      for (const dose of vaccines_medicines.doses) {
        await this.doseRepo.save({
          id: dose.id,
          id_vaccine_medicine: vm.id,
          application_date: dose.application_date,
          applied: dose.applied,
          number_dose: dose.number_dose
        });
      }
    }

    if (!post || !animal || !animalAdopt) {
      throw new Error(`Could not save post`);
    }

    return {
      id: post.id,
    };
  }

  async publishSponsorshipPost(entity: Post): PublishSponsorshipPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });
    
    const model = PostMapper.getModel(entity, user);
    const animalSponsorshipModel = AnimalSponsorshipMapper.getModel(
      entity.animal as any,
    );

    const animal = await this.animalRepo.save(model.animal);
    const animalSponsorship = await this.animalSponsorshipRepo.save(
      animalSponsorshipModel,
    );
    const post = await this.postRepo.save(model);

    if (!post || !animal || !animalSponsorship) {
      throw new Error(`Could not save post`);
    }

    await this.addPersonalities(entity.animal.personalities, animal.id);
    await this.addNeeds((entity.animal as any).needs, animal.id);

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
        'animal_adopt.size_current',
        'animal_adopt.size_estimated',
        'animal_adopt.breed',
      ])
      .addSelect('post.id AS post_id')
      .addSelect('post.created_at AS post_created_at')
      .addSelect('post.updated_at AS post_updated_at')
      .addSelect('post.deleted_at AS post_deleted_at')
      .from(AnimalModel, 'animal')
      .innerJoin(PostModel, 'post', 'post.animal = animal.id')
      .innerJoin(
        AnimalAdoptModel,
        'animal_adopt',
        'animal.id = animal_adopt.animal_id',
      )
      .where('post.type = :type', { type: TypePost.ADOPTION })
      .getRawMany();

    const promises = result.map(async (res) => {
      res.personalities = await this.getPersonalities(res.animal);

      res.health = await this.healthRepo.findOne({where: {id_animal: res.animal}});
      res.health.disease_allergy = await this.diseaseAllergyRepo.find({where: {id_animal: res.animal}});
      const animal = await this.animalRepo.findOne({where: {id: res.animal}});
      res.health.vaccines_medicines = await this.vaccineMedicineRepo.find({where: {id_animal: animal.id}});

      for (const item of res.health.vaccines_medicines) {
        item.doses = await this.doseRepo.find({ where: { id_vaccine_medicine: item.id } });
      }

      return AnimalAdoptMapper.getEntityWithJsonData(res);
    });

    return await Promise.all(promises);
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
      .innerJoin(
        AnimalSponsorshipModel,
        'animal_sponsorship',
        'animal.id = animal_sponsorship.animal_id',
      )
      .where('post.type = :type', { type: TypePost.SPONSORSHIP })
      .getRawMany();

      const promises = result.map(async (res) => {
        res.personalities = await this.getPersonalities(res.animal);
        res.needs = await this.getNeeds(res.animal);
        return AnimalSponsorshipMapper.getEntityWithJsonData(res);
      });
  
      return await Promise.all(promises);
  }

  async getPersonalities(idAnimal: string): Promise<Personality[]> {
    const animalHasPersonality = await this.animalHasPersonalityRepo.find({
      where: { id_animal: idAnimal },
    });

    const personalities: Personality[] = [];

    for (const personality of animalHasPersonality) {
      const foundPersonality = await this.personalityRepo.findOne({
        where: { id: personality.id_personality },
      });
      personalities.push(new Personality(foundPersonality));
    }

    return personalities;
  }

  async addPersonalities(personalities: Personality[], animalId: string) {
    for (const personality of personalities) {
      await this.animalHasPersonalityRepo.save({
        id_animal: animalId,
        id_personality: personality.id,
      });
    }
  }

  async getNeeds(idAnimal: string): Promise<Need[]> {
    const animalHasNeed = await this.animalHasNeedRepo.find({
      where: { id_animal: idAnimal },
    });

    const needs: Need[] = [];

    for (const need of animalHasNeed) {
      const foundNeed = await this.needRepo.findOne({
        where: { id: need.id_need },
      });
      needs.push(new Need(foundNeed));
    }

    return needs;
  }

  async addNeeds(needs: Need[], animalId: string) {
    for (const need of needs) {
      await this.animalHasNeedRepo.save({
        id_animal: animalId,
        id_need: need.id,
      });
    }
  }
}
