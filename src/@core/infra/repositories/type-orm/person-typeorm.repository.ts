import Person from '../../../domain/entities/users/person';
import IPersonRepository from '../../../domain/contracts/person-repository.interface';
import { DataSource, Repository } from 'typeorm';
import PersonModel from '../../../domain/models/person.model';
import UserModel from '../../../domain/models/user.model';
import { PersonMapper } from '../../../domain/mappers/person.mapper';

export class PersonTypeormRepository implements IPersonRepository {
  private personRepo: Repository<PersonModel>;
  private userRepo: Repository<UserModel>;

  constructor(private dataSource: DataSource) {
    this.personRepo = this.dataSource.getRepository(PersonModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
  }

  async insert(entity: Person): Promise<string> {
    await this.userRepo.save(PersonMapper.getModel(entity));
    await this.personRepo.save(PersonMapper.getModel(entity));

    return entity.get('id').toString();
  }

  async findById(id: string): Promise<Person> {
    const model = await this._get(id);
    return PersonMapper.getEntity(model, model);
  }

  async findAll(): Promise<Person[]> {
    const models = await this.dataSource.query(`
        SELECT * FROM person
        INNER JOIN user ON person.id = user.id
    `);

    const entities: Person[] = [];

    models.forEach(async (model) => {
      entities.push(PersonMapper.getEntity(model, model));
    });

    return entities;
  }

  async update(entity: Person): Promise<void> {
    const personUpdateResult = await this.personRepo.update(
      entity.getProps().id.toString(),
      PersonMapper.getPerson(entity)
    );

    const userUpdateResult = await this.userRepo.update(
      entity.getProps().id.toString(),
      PersonMapper.getUser(entity)
    );

    if (personUpdateResult.affected === 0 || userUpdateResult.affected === 0) {
      throw new Error(`Could not update person with ID ${entity.getProps().id.toString()}`);
    }
  }

  async delete(id: string): Promise<void> {
    const model = await this._get(id);

    const userDeleteResult = await this.userRepo.delete({ id: model.id });
    const personDeleteResult = await this.personRepo.delete({ id: model.id });

    if (personDeleteResult.affected === 0 || userDeleteResult.affected === 0) {
      throw new Error(`Could not delete person with ID ${id}`);
    }
  }

  async getActiveRecords(): Promise<Person[]> {
    const models = await this.dataSource.query(`
        SELECT * FROM person
        INNER JOIN user ON person.id = user.id
        WHERE user.deleted_at IS NULL
    `);

    const entities: Person[] = [];

    models.forEach(async (model) => {
      entities.push(PersonMapper.getEntity(model, model));
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
      entities.push(PersonMapper.getEntity(model, model));
    });

    return entities;
  }

  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }

  resetPassword(id: string, newPassword: string) {
    throw new Error('Method not implemented.');
  }

  async _get(id: string){
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
