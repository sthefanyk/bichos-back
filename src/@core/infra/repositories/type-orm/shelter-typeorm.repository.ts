import {
  ShelterCreate,
  ShelterFindById,
  ShelterUpdate,
  ShelterFindByCpf,
} from 'src/@core/application/use-cases/shelter';
import { ShelterFindByNameShelter } from 'src/@core/application/use-cases/shelter/find-by-name-shelter.usecase';
import { UserFindByEmail } from 'src/@core/application/use-cases/user/find-by-email.usecase';
import { UserFindByUsername } from 'src/@core/application/use-cases/user/find-by-username.usecase';
import { IShelterRepository } from 'src/@core/domain/contracts/shelter-repository.interface';
import Shelter from 'src/@core/domain/entities/users/shelter';
import { ShelterModel, UserModel } from 'src/@core/domain/models';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { DataSource, Repository } from 'typeorm';
import { City } from 'src/@core/domain/entities/localization/city';
import { State } from 'src/@core/domain/entities/localization/state';
import { GalleryTypeormRepository } from './gallery-typeorm.repository';

export class ShelterTypeormRepository implements IShelterRepository  {
  private shelterRepo: Repository<ShelterModel>;
  private userRepo: Repository<UserModel>;
  private repoGallery: GalleryTypeormRepository;

  constructor(private dataSource: DataSource) {
    this.shelterRepo = this.dataSource.getRepository(ShelterModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
    this.repoGallery = new GalleryTypeormRepository(dataSource);
  }

  async insert(entity: Shelter): ShelterCreate.Output {    
    const user = await this.userRepo.save({
      ...entity.user,
      header_picture: entity.user.header_picture.id,
      profile_picture: entity.user.profile_picture.id
    });

    const shelter = await this.shelterRepo.save({...entity.toJson(), user});

    if (!user || !shelter) return null;

    return { id: user.id };
  }

  async findById(id: string): ShelterFindById.Output {
    return await this._get(id);
  }

  async findAll(): Promise<Shelter[]> {
    const models = await this.shelterRepo.createQueryBuilder('shelter')
      .leftJoinAndSelect('shelter.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .getMany();

    return this._convertAll(models);
  }

  async update(entity: Shelter): ShelterUpdate.Output {
    const userUpdateResult = await this.userRepo.update(
      entity.id, {
        ...entity.user,
        header_picture: entity.user.header_picture.id,
        profile_picture: entity.user.profile_picture.id
      }
    );

    const shelterUpdateResult = await this.shelterRepo.update(
      entity.id, {
        id: entity.id,
        name_shelter: entity.name_shelter,
        responsible_cpf: entity.responsible_cpf,
        responsible_date_birth: entity.responsible_date_birth,
        star_date_shelter: entity.star_date_shelter,
        user: {
          ...entity.user,
          header_picture: entity.user.header_picture.id,
          profile_picture: entity.user.profile_picture.id
        }
      }
    );

    if (shelterUpdateResult.affected === 0 || userUpdateResult.affected === 0)
      return null;

    return { id: entity.id };
  }

  async getActiveRecords(): Promise<Shelter[]> {
    const models = await this.shelterRepo.createQueryBuilder('shelter')
      .leftJoinAndSelect('shelter.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at IS NULL')
      .getMany();

    return this._convertAll(models);
  }

  async getInactiveRecords(): Promise<Shelter[]> {
    const models = await this.shelterRepo.createQueryBuilder('shelter')
      .leftJoinAndSelect('shelter.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at NOT NULL')
      .getMany();

    return this._convertAll(models);
  }

  async findByNameShelter(name: string): ShelterFindByNameShelter.Output {
    const model = await this.shelterRepo.findOne({
      where: { name_shelter: name }
    });

    if (!model) return null;

    return await this._get(model.id);
  }

  async findByCpf(cpf: CPF): ShelterFindByCpf.Output {
    const model = await this.shelterRepo.findOne({
      where: { responsible_cpf: cpf.cpf }
    });

    if (!model) return null;

    return await this._get(model.id);
  }

  async findByEmail(email: string): UserFindByEmail.Output {
    const model = await this.userRepo.findOne({
        where: { email }
    });

    if (!model) return null;

    return await this._get(model.id);
  }

  async findByUsername(username: string): UserFindByUsername.Output {
    const model = await this.userRepo.findOne({
      where: { username }
    });

    if (!model) return null;

    return await this._get(model.id);
  }

  async _get(id: string) {
    const shelter = await this.shelterRepo.findOne({ 
      where: { id }, 
      relations: ['user', 'user.city', 'user.city.state']}
    )

    if (!shelter) return null;

    const profile_picture = await this.repoGallery.getImageUrl(shelter.user.profile_picture);
    const header_picture = await this.repoGallery.getImageUrl(shelter.user.header_picture);

    return new Shelter({
      ...shelter,
      userAttr: {
        ...shelter.user,
        profile_picture: { id: shelter.user.profile_picture, url: profile_picture.url },
        header_picture: { id: shelter.user.header_picture, url: header_picture.url },
        city: new City({ 
          ...shelter.user.city, 
          state: new State({ ...shelter.user.city.state })
        })
      }
    })
  }

  async _convertAll(models: ShelterModel[]) {
    const shelters: Shelter[] = [];

    for (const shelter of models) {
      const profile_picture = await this.repoGallery.getImageUrl(shelter.user.profile_picture);
      const header_picture = await this.repoGallery.getImageUrl(shelter.user.header_picture);

      shelters.push(
        new Shelter({
          ...shelter,
          userAttr: {
            ...shelter.user,
            profile_picture: { id: shelter.user.profile_picture, url: profile_picture.url },
            header_picture: { id: shelter.user.header_picture, url: header_picture.url },
            city: new City({ 
              ...shelter.user.city, 
              state: new State({ ...shelter.user.city.state })
            })
          }
        })
      )
    }

    return shelters;
  }
}
