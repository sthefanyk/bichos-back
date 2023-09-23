import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import Person from '../../../domain/entities/users/person';
import { DataSource, Repository } from 'typeorm';
import PersonModel from '../../../domain/models/person.model';
import UserModel from '../../../domain/models/user.model';
import { PersonMapper } from '../../../domain/mappers/person.mapper';
import { PersonCreate } from 'src/@core/application/use-cases/person';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { UserFindByEmail } from 'src/@core/application/use-cases/user/find-by-email.usecase';
import { PersonFindByCpf } from 'src/@core/application/use-cases/person/find-by-cpf.usecase';
import { UserFindByUsername } from 'src/@core/application/use-cases/user/find-by-username.usecase';

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
      name: person.user.fullName,
    };
  }

  async findById(id: string): Promise<Person> {
    const model = await this._get(id);
    return PersonMapper.getEntity(model);
  }

  async findByCpf(cpf: CPF): PersonFindByCpf.Output {
    const model = await this.personRepo.findOne({
      where: { cpf: cpf.value }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async findAll(): Promise<Person[]> {
    const models = await this.personRepo.find({ relations: ['user'] });

    const entities: Person[] = [];

    models.forEach(async (model) => {
      entities.push(PersonMapper.getEntity(model));
    });

    return entities;
  }

  async update(entity: Person): Promise<void> {
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
  }

  async delete(id: string): Promise<void> {
    const model = await this._get(id);

    const userDeleteResult = await this.userRepo.delete({ id: model.id });
    // const personDeleteResult = await this.personRepo.delete({ user_id: model.id });

    // if (personDeleteResult.affected === 0 || userDeleteResult.affected === 0) {
    //   throw new Error(`Could not delete person with ID ${id}`);
    // }
  }

  async getActiveRecords(): Promise<Person[]> {
    const models = await this.dataSource.query(`
        SELECT * FROM person
        INNER JOIN user ON person.id = user.id
        WHERE user.deleted_at IS NULL
    `);

    const entities: Person[] = [];

    models.forEach(async (model) => {
      entities.push(PersonMapper.getEntity(model));
    });

    return entities;
  }

  async getInactiveRecords(): Promise<Person[]> {
    const models = await this.dataSource.query(`
        SELECT * FROM person
        INNER JOIN user ON person.id = user.id
        WHERE user.deleted_at NOT NULL
    `);

    const entities: Person[] = [];

    models.forEach(async (model) => {
      entities.push(PersonMapper.getEntity(model));
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
      .where('person.id = :id', { id })
      .getRawOne();

    if (!result) {
      throw new Error(`Could not find person`);
    }

    return result;
  }
}
