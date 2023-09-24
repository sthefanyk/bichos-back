import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import Person from '../../../domain/entities/users/person';
import { DataSource, Repository } from 'typeorm';
import PersonModel from '../../../domain/models/person.model';
import UserModel from '../../../domain/models/user.model';
import { PersonMapper } from '../../../domain/mappers/person.mapper';
import { PersonCreate, PersonFindById, PersonUpdate } from 'src/@core/application/use-cases/person';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { UserFindByEmail } from 'src/@core/application/use-cases/user/find-by-email.usecase';
import { PersonFindByCpf } from 'src/@core/application/use-cases/person/find-by-cpf.usecase';
import { UserFindByUsername } from 'src/@core/application/use-cases/user/find-by-username.usecase';
import { CityModel } from 'src/@core/domain/models/city.model';
import { StateModel } from 'src/@core/domain/models/state.model';

export class PersonTypeormRepository implements IPersonRepository {
  private personRepo: Repository<PersonModel>;
  private userRepo: Repository<UserModel>;

  constructor(private dataSource: DataSource) {
    this.personRepo = this.dataSource.getRepository(PersonModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
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

  async insert(entity: Person): PersonCreate.Output {
    const model = PersonMapper.getModel(entity);

    const user = await this.userRepo.save(model.user);
    const person = await this.personRepo.save(model);

    if (!user || !person) {
      throw new Error(`Could not save user`);
    }

    return {
      id: user.id,
      name: person.user.full_name,
      email: person.user.email
    };
  }

  async findById(id: string): PersonFindById.Output {
    const entity = await this._get(id);
    return entity;
  }

  async findByCpf(cpf: CPF): PersonFindByCpf.Output {
    const model = await this.personRepo.findOne({
      where: { cpf: cpf.cpf }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async findAll(): Promise<Person[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(PersonModel, 'person')
      .innerJoin(UserModel, 'user', 'person.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .getRawMany();

    const entities: Person[] = [];

    result.forEach(async (res) => {
      entities.push(PersonMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async update(entity: Person): PersonUpdate.Output {
    const model = PersonMapper.getModel(entity);

    const personUpdateResult = await this.personRepo.update(
      model.user.id, model
    );

    const userUpdateResult = await this.userRepo.update(
      model.user.id, model.user
    );

    if (personUpdateResult.affected === 0 || userUpdateResult.affected === 0) {
      throw new Error(
        `Could not update person with ID ${model.user.id}`,
      );
    }

    return {
      id: model.id,
      name: model.user.full_name,
      email: model.user.email
    }
  }

  async delete(id: string): Promise<void> {
    // const model = await this._get(id);

    // const userDeleteResult = await this.userRepo.delete({ id: model.id });
    // const personDeleteResult = await this.personRepo.delete({ user_id: model.id });

    // if (personDeleteResult.affected === 0 || userDeleteResult.affected === 0) {
    //   throw new Error(`Could not delete person with ID ${id}`);
    // }
  }

  async getActiveRecords(): Promise<Person[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(PersonModel, 'person')
      .innerJoin(UserModel, 'user', 'person.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at IS NULL')
      .getRawMany();

    const entities: Person[] = [];

    result.forEach(async (res) => {
      entities.push(PersonMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async getInactiveRecords(): Promise<Person[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(PersonModel, 'person')
      .innerJoin(UserModel, 'user', 'person.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at NOT NULL')
      .getRawMany();

    const entities: Person[] = [];

    result.forEach(async (res) => {
      entities.push(PersonMapper.getEntityWithJsonData(res));
    });

    return entities;
  }


  resetPassword(id: string, newPassword: string) {
    throw new Error('Method not implemented.');
  }

  async _get(id: string) {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(PersonModel, 'person')
      .innerJoin(UserModel, 'user', 'person.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('person.id = :id', { id })
      .getRawOne();

    // const result = await this.userRepo.findOne({ where: { id }, relations: ['city']})

    if (!result) {
      return null;
    }

    return PersonMapper.getEntityWithJsonData(result);
  }
}
