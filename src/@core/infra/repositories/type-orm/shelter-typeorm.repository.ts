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
import { ShelterMapper } from 'src/@core/domain/mappers/shelter.mapper';
import { CityModel } from 'src/@core/domain/models/city.model';
import ShelterModel from 'src/@core/domain/models/shelter.model';
import { StateModel } from 'src/@core/domain/models/state.model';
import UserModel from 'src/@core/domain/models/user.model';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { DataSource, Repository } from 'typeorm';
import { UserTypeormRepository } from './user-typeorm.repository';

export class ShelterTypeormRepository extends UserTypeormRepository implements IShelterRepository  {
  private shelterRepo: Repository<ShelterModel>;
  private userRepo: Repository<UserModel>;

  constructor(private dataSource: DataSource) {
    super(dataSource);
    this.shelterRepo = this.dataSource.getRepository(ShelterModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
  }

  async insert(entity: Shelter): ShelterCreate.Output {
    const model = ShelterMapper.getModel(entity);
    
    const user = await this.userRepo.save(model.user);
    const shelter = await this.shelterRepo.save(model);

    if (!user || !shelter) {
      throw new Error(`Could not save user`);
    }

    return {
      id: user.id,
      name: shelter.user.full_name,
      name_shelter: shelter.name_shelter,
      email: shelter.user.email
    };
  }

  async findById(id: string): ShelterFindById.Output {
    return await this._get(id);
  }

  async findAll(): Promise<Shelter[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(ShelterModel, 'shelter')
      .innerJoin(UserModel, 'user', 'shelter.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .getRawMany();

    const entities: Shelter[] = [];

    result.forEach(async (res) => {
      entities.push(ShelterMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async update(entity: Shelter): ShelterUpdate.Output {
    const model = ShelterMapper.getModel(entity);

    const shelterUpdateResult = await this.shelterRepo.update(
      model.user.id, model
    );

    const userUpdateResult = await this.userRepo.update(
      model.user.id, model.user
    );

    if (shelterUpdateResult.affected === 0 || userUpdateResult.affected === 0) {
      throw new Error(
        `Could not update shelter with ID ${model.user.id}`,
      );
    }

    return {
      id: model.id,
      name: model.user.full_name,
      name_shelter: model.name_shelter,
      email: model.user.email
    }
  }
  
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getActiveRecords(): Promise<Shelter[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(ShelterModel, 'shelter')
      .innerJoin(UserModel, 'user', 'shelter.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at IS NULL')
      .getRawMany();

    const entities: Shelter[] = [];

    result.forEach(async (res) => {
      entities.push(ShelterMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async getInactiveRecords(): Promise<Shelter[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(ShelterModel, 'shelter')
      .innerJoin(UserModel, 'user', 'shelter.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at NOT NULL')
      .getRawMany();

    const entities: Shelter[] = [];

    result.forEach(async (res) => {
      entities.push(ShelterMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async findByNameShelter(name: string): ShelterFindByNameShelter.Output {
    const model = await this.shelterRepo.findOne({
      where: { name_shelter: name }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async findByCpf(cpf: CPF): ShelterFindByCpf.Output {
    const model = await this.shelterRepo.findOne({
      where: { responsible_cpf: cpf.cpf }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async findByEmail(email: string): UserFindByEmail.Output {
    const model = await this.userRepo.findOne({
        where: { email }
    });

    if (model) 
    return { id: model.id }

    return { id: '' };
  }

  async findByUsername(username: string): UserFindByUsername.Output {
    const model = await this.userRepo.findOne({
      where: { username }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async _get(id: string) {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(ShelterModel, 'shelter')
      .innerJoin(UserModel, 'user', 'shelter.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('shelter.id = :id', { id })
      .getRawOne();

    if (!result) {
      return null;
    }

    return ShelterMapper.getEntityWithJsonData(result);
  }
}
