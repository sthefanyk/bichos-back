import { IPersonRepository } from '../../../domain/contracts/person-repository.interface';
import Person from '../../../domain/entities/users/person';
import { DataSource, Repository } from 'typeorm';
import { PersonModel, UserModel } from '../../../domain/models';
import { PersonCreate, PersonFindById, PersonUpdate, PersonFindByCpf } from 'src/@core/application/use-cases/person';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { UserFindByEmail, UserFindByUsername } from 'src/@core/application/use-cases/user';
import { State } from 'src/@core/domain/entities/localization/state';
import { City } from 'src/@core/domain/entities/localization/city';
import { GalleryTypeormRepository } from './gallery-typeorm.repository';

export class PersonTypeormRepository implements IPersonRepository {
  private personRepo: Repository<PersonModel>;
  private userRepo: Repository<UserModel>;
  private repoGallery: GalleryTypeormRepository;

  constructor(private dataSource: DataSource) {
    this.personRepo = this.dataSource.getRepository(PersonModel);
    this.userRepo = this.dataSource.getRepository(UserModel);
    this.repoGallery = new GalleryTypeormRepository(dataSource);
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

  async insert(entity: Person): PersonCreate.Output {
    const user = await this.userRepo.save({
      ...entity.user,
      header_picture: entity.user.header_picture.id,
      profile_picture: entity.user.profile_picture.id
    });

    const person = await this.personRepo.save({...entity.toJson(), user});

    if (!user || !person) return null;

    return { id: user.id };
  }

  async findById(id: string): PersonFindById.Output {
    return this._get(id);
  }

  async findByCpf(cpf: CPF): PersonFindByCpf.Output {
    const model = await this.personRepo.findOne({
      where: { cpf: cpf.cpf }
    });

    if (!model) return null;

    return this._get(model.id);
  }

  async findAll(): Promise<Person[]> {
    const models = await this.personRepo.find({
      relations: ['user', 'user.city', 'user.city.state']}
    )

    return this._convertAll(models);
  }

  async update(entity: Person): PersonUpdate.Output {
    const userUpdateResult = await this.userRepo.update(
      entity.id, {
        ...entity.user,
        header_picture: entity.user.header_picture.id,
        profile_picture: entity.user.profile_picture.id
      }
    );

    const personUpdateResult = await this.personRepo.update(
      entity.id, {
        id: entity.id,
        cpf: entity.cpf,
        date_birth: entity.date_birth,
        user: {
          ...entity.user,
          header_picture: entity.user.header_picture.id,
          profile_picture: entity.user.profile_picture.id
        },
      }
    );

    if (personUpdateResult.affected === 0 || userUpdateResult.affected === 0)
      return null;

    return { id: entity.id}
  }

  async getActiveRecords(): Promise<Person[]> {
    const models = await this.personRepo.createQueryBuilder('person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at IS NULL')
      .getMany();

    return this._convertAll(models);
  }

  async getInactiveRecords(): Promise<Person[]> {
    const models = await this.personRepo.createQueryBuilder('person')
      .leftJoinAndSelect('person.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at NOT NULL')
      .getMany();

    return this._convertAll(models);
  }

  async _get(id: string) {
    const person = await this.personRepo.findOne({ 
      where: { id }, 
      relations: ['user', 'user.city', 'user.city.state']}
    )

    if (!person) return null;

    const profile_picture = await this.repoGallery.getImageUrl(person.user.profile_picture);
    const header_picture = await this.repoGallery.getImageUrl(person.user.header_picture);

    return new Person({
      ...person,
      userAttr: {
        ...person.user,
        profile_picture: { id: person.user.profile_picture, url: profile_picture.url },
        header_picture: { id: person.user.header_picture, url: header_picture.url },
        city: new City({ 
          ...person.user.city, 
          state: new State({ ...person.user.city.state })
        })
      }
    })
  }

  async _convertAll(models: PersonModel[]) {
    const persons: Person[] = [];

    for (const person of models) {
      const profile_picture = await this.repoGallery.getImageUrl(person.user.profile_picture);
      const header_picture = await this.repoGallery.getImageUrl(person.user.header_picture);

      persons.push(
        new Person({
          ...person,
          userAttr: {
            ...person.user,
            profile_picture: { id: person.user.profile_picture, url: profile_picture.url },
            header_picture: { id: person.user.header_picture, url: header_picture.url },
            city: new City({ 
              ...person.user.city, 
              state: new State({ ...person.user.city.state })
            })
          }
        })
      )
    }

    return persons;
  }
}
