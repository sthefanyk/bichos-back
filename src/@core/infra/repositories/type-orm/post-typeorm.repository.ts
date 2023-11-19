import { DataSource, Repository } from 'typeorm';
import UserModel from '../../../domain/models/user.model';
import { IPostRepository } from 'src/@core/domain/contracts/post-repository.interface';
import { PublishAdoptPost } from 'src/@core/application/use-cases/post/publish-adopt-post.usecase';
import { Post } from 'src/@core/domain/entities/posts/post';
import PostModel from 'src/@core/domain/models/post.model';
import AnimalModel from 'src/@core/domain/models/animal.model';
import AnimalAdoptModel from 'src/@core/domain/models/animal-adopt';
import {
  CheckAndUpdateStatusAdoptPost,
  CheckAndUpdateStatusSponsorshipPost,
  FindAllAdoptPost,
  FindAllSponsorshipPost,
  PublishSponsorshipPost,
} from 'src/@core/application/use-cases/post';
import AnimalSponsorshipModel from 'src/@core/domain/models/animal-sponsorship';
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
import { CityModel } from 'src/@core/domain/models/city.model';
import { AnimalAdopt } from 'src/@core/domain/entities/posts/animal-adopt';
import { AnimalSponsorship } from 'src/@core/domain/entities/posts/animal-sponsorship';
import { City } from 'src/@core/domain/entities/localization/city';
import { State } from 'src/@core/domain/entities/localization/state';
import { Health } from 'src/@core/domain/entities/health/health';
import { DiseaseAllergy } from 'src/@core/domain/entities/health/disease-allergy';
import { VaccineMedicine } from 'src/@core/domain/entities/health/vaccine-medicine';
import { Dose } from 'src/@core/domain/entities/health/dose';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import { Contact } from 'src/@core/domain/entities/contact';
import Phone from 'src/@core/shared/domain/value-objects/phone.vo';

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
  private cityRepo: Repository<CityModel>;

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
    this.cityRepo = this.dataSource.getRepository(CityModel);
  }

  async updateStatusAdoptPost(entities: Post[]): CheckAndUpdateStatusAdoptPost.Output {
    for (const entity of entities) {
      const animal: AnimalAdopt = entity.animal as any;
      await this.animalAdoptRepo.update(animal.id, {
        status: animal.status,
        update_status_at: animal.update_status_at
      });
    }
  }

  async updateStatusSponsorshipPost(entities: Post[]): CheckAndUpdateStatusSponsorshipPost.Output {
    for (const entity of entities) {
      const animal: AnimalSponsorship = entity.animal as any;
      await this.animalSponsorshipRepo.update(animal.id, {
        status: animal.status,
        update_status_at: animal.update_status_at
      });
    }
  }

  async findByIdPost(id: string): Promise<PostModel> {
    return this.postRepo.findOne({ where: { id } });
  }

  async inactivate(entity: Post): PostInactivate.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const result = await this.postRepo.update(entity.id, {
      ...entity.toJson(),
      posted_by: user,
      animal: entity.animal.toJson(),
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

    if (result.affected === 0) {
      throw new Error(`Could not inactive post with ID ${entity.id}`);
    }

    return {
      id: entity.id,
      type: entity.type,
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
        'animal_adopt.status',
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

    const city = await this.cityRepo.findOne({
      where: { name: result.city_name },
      relations: ['state'],
    });
    result.city = new City({ ...city, state: new State({ ...city.state })});
    
    result.personalities = await this.getPersonalities(result.animal);
    
    result.health = await this.healthRepo.findOne({where: {id_animal: result.animal}});
    result.health.disease_allergy = await this.diseaseAllergyRepo.find({where: {id_animal: result.animal}});
    const animal = await this.animalRepo.findOne({where: {id: result.animal}});
    result.health.vaccines_medicines = await this.vaccineMedicineRepo.find({where: {id_animal: animal.id}});
    
    for (const item of result.health.vaccines_medicines) {
      item.doses = await this.doseRepo.find({ where: { id_vaccine_medicine: item.id } });
    }

    return this.getEntityWithJsonData(result);
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

    const city = await this.cityRepo.findOne({
      where: { name: result.city_name },
      relations: ['state'],
    });
    result.city = new City({ ...city, state: new State({ ...city.state })});

    result.needs = await this.getNeeds(result.animal);

    return this.sponsorshipGetEntityWithJsonData(result);
  }

  async publishAdoptPost(entity: Post): PublishAdoptPost.Output {
    const user = await this.userRepo.findOne({
      where: { id: entity.posted_by },
    });

    const animalAdoptModel: AnimalAdopt = entity.animal.toJson() as any;
    
    const animal = await this.animalRepo.save(entity.animal.toJson());
    const animalAdopt = await this.animalAdoptRepo.save({
      id: animalAdoptModel.id,
      breed: animalAdoptModel.breed,
      size_current: animalAdoptModel.size_current,
      size_estimated: animalAdoptModel.size_estimated,
      status: animalAdoptModel.status,
      update_status_at: animalAdoptModel.update_status_at,
    });
    const post = await this.postRepo.save({
      ...entity.toJson(),
      posted_by: user,
      animal,
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

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
    
    const animalSponsorshipModel: AnimalSponsorship = entity.animal.toJson() as any;

    const animal = await this.animalRepo.save(entity.animal.toJson());
    const animalSponsorship = await this.animalSponsorshipRepo.save({
      id: animalSponsorshipModel.id,
      accompany: animalSponsorshipModel.accompany,
      reason_request: animalSponsorshipModel.reason_request,
      status: animalSponsorshipModel.status,
      update_status_at: animalSponsorshipModel.update_status_at
    });
    const post = await this.postRepo.save({
      ...entity.toJson(),
      posted_by: user,
      animal,
      contact_name: entity.contact.name,
      contact_email: entity.contact.email,
      contact_phone: entity.contact.phone,
      contact_city: entity.contact.city.toJson(),
    });

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
        'animal_adopt.status',
        'animal_adopt.update_status_at',
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

      const city = await this.cityRepo.findOne({
        where: { name: res.city_name },
        relations: ['state'],
      });
      res.city = new City({ ...city, state: new State({ ...city.state })});

      res.health = await this.healthRepo.findOne({where: {id_animal: res.animal}});
      res.health.disease_allergy = await this.diseaseAllergyRepo.find({where: {id_animal: res.animal}});
      const animal = await this.animalRepo.findOne({where: {id: res.animal}});
      res.health.vaccines_medicines = await this.vaccineMedicineRepo.find({where: {id_animal: animal.id}});

      for (const item of res.health.vaccines_medicines) {
        item.doses = await this.doseRepo.find({ where: { id_vaccine_medicine: item.id } });
      }

      return this.getEntityWithJsonData(res);
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
        'animal_sponsorship.status',
        'animal_sponsorship.update_status_at',
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

        const city = await this.cityRepo.findOne({
          where: { name: res.city_name },
          relations: ['state'],
        });
        res.city = new City({ ...city, state: new State({ ...city.state })});

        res.needs = await this.getNeeds(res.animal);
        return this.sponsorshipGetEntityWithJsonData(res);
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

  getEntityWithJsonData(data: {
    animal_adopt_size_current: string;
    animal_adopt_size_estimated: string;
    animal_adopt_breed: string;
    animal_adopt_status: string;
    animal_adopt_update_status_at: Date;
    
    health: any;

    name: string;
    sex: string;
    date_birth: string;
    species: string;
    history: string;
    characteristic: string;
    personalities: Personality[];

    animal: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,

    urgent: string;
    user_id: string;
    renewal_count: string;
    type: string;
    urgency_justification: string;

    post_id: string,
    post_created_at: string,
    post_updated_at: string,
    post_deleted_at: string,

    contact_name: string;
    contact_email: string;
    contact_phone: string;
    
    city: City;
  }): Post {
      const animal = new AnimalAdopt({
          size_current: +data.animal_adopt_size_current,
          size_estimated: +data.animal_adopt_size_estimated,
          breed: data.animal_adopt_breed,
          status: +data.animal_adopt_status,
          update_status_at: data.animal_adopt_update_status_at,
          health: new Health({
              additional: data.health.additional,
              neutered: data.health.neutered,
              disease_allergy: data.health.disease_allergy.map(
                  item => new DiseaseAllergy({...item, type: +item.type}) 
              ),
              vaccines_medicines: data.health.vaccines_medicines.map(
                  item => new VaccineMedicine({
                      ...item,
                      type: +item.type,
                      doses: item.doses.map(item => new Dose(item))
                  })
              ),
          }),
      }, {
          name: data.name,
          sex: +data.sex,
          date_birth: new Date(data.date_birth),
          species: +data.species,
          history: data.history,
          characteristic: data.characteristic,
          personalities: data.personalities,

          id: data.animal,
          created_at: new Date(data.created_at),
          updated_at: new Date(data.updated_at),
          deleted_at: new Date(data.deleted_at),
      });

      const post = new Post({
          urgent: data.urgent === "true",
          posted_by: new UUID(data.user_id),
          renewal_count: +data.renewal_count,
          type: +data.type,
          urgency_justification: data.urgency_justification,
          animal,
          contact: new Contact({
              name: data.contact_name,
              email: data.contact_email,
              phone: new Phone(data.contact_phone),
              city: data.city
          }),

          id: data.post_id,
          created_at: new Date(data.post_created_at),
          updated_at: new Date(data.post_updated_at),
          deleted_at: new Date(data.post_deleted_at),
          
      });

      return post;
  }

  sponsorshipGetEntityWithJsonData(data: {
    animal_sponsorship_accompany: string;
    animal_sponsorship_reason_request: string;
    animal_sponsorship_status: string;
    animal_sponsorship_update_status_at: Date;
    needs: Need[];

    name: string;
    sex: string;
    date_birth: string;
    species: string;
    history: string;
    characteristic: string;
    personalities: Personality[];

    animal: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,

    urgent: string;
    user_id: string;
    renewal_count: string;
    type: string;
    urgency_justification: string;

    post_id: string,
    post_created_at: string,
    post_updated_at: string,
    post_deleted_at: string,

    contact_name: string;
    contact_email: string;
    contact_phone: string;
    
    city: City;
  }): Post {
      const animal = new AnimalSponsorship({
          accompany: data.animal_sponsorship_accompany === "true",
          reason_request: data.animal_sponsorship_reason_request,
          needs: data.needs,
          status: +data.animal_sponsorship_status,
          update_status_at: data.animal_sponsorship_update_status_at
      }, {
          name: data.name,
          sex: +data.sex,
          date_birth: new Date(data.date_birth),
          species: +data.species,
          history: data.history,
          characteristic: data.characteristic,
          personalities:data.personalities,

          id: data.animal,
          created_at: new Date(data.created_at),
          updated_at: new Date(data.updated_at),
          deleted_at: new Date(data.deleted_at),
      });

      return new Post({
          urgent: data.urgent === "true",
          posted_by: new UUID(data.user_id),
          renewal_count: +data.renewal_count,
          type: +data.type,
          urgency_justification: data.urgency_justification,
          animal,
          contact: new Contact({
              name: data.contact_name,
              email: data.contact_email,
              phone: new Phone(data.contact_phone),
              city: data.city
          }),

          id: data.post_id,
          created_at: new Date(data.post_created_at),
          updated_at: new Date(data.post_updated_at),
          deleted_at: new Date(data.post_deleted_at),
          
      });
  }
}
