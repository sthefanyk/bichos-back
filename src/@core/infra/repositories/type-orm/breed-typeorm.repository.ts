import {
  BreedActivate,
  BreedFindById,
  BreedFindByName,
  BreedGetActiveRecords,
  BreedGetInactiveRecords,
  BreedInactivate,
  BreedSearch,
  BreedUpdate,
} from 'src/@core/application/use-cases/breed';
import { IBreedRepository } from 'src/@core/domain/contracts';
import { Breed } from 'src/@core/domain/entities/breed';
import BreedModel from 'src/@core/domain/models/breed.model';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

export class BreedTypeormRepository implements IBreedRepository {
  private repo: Repository<BreedModel>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(BreedModel);
  }

  async insert(entity: Breed) {
    const breed = await this.repo.save({
      name: entity.name,
      id: entity.id,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    });

    if (!breed) {
      throw new Error(`Could not save breed`);
    }

    return { id: breed.id };
  }

  async update(entity: Breed): BreedUpdate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      throw new Error(`Could not update breed`);
    }

    return { id: entity.id, name: entity.name };
  }

  async findById(id: string): BreedFindById.Output {
    const breed = await this.repo.findOne({ where: {id}});

    if (!breed) {
      return null;
    }

    return new Breed(breed);
  }

  async findByName(name: string): BreedFindByName.Output {
    const breed = await this.repo.findOne({ where: {name}});

    if (!breed) {
      return null;
    }

    return new Breed(breed);
  }

  async activate(entity: Breed): BreedActivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async inactivate(entity: Breed): BreedInactivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async findAll(): BreedSearch.Output {
    const result = await this.repo.find();

    const breeds: Breed[] = [];

    result.forEach(breed => {
      breeds.push(new Breed(breed));
    });

    return breeds;
  }

  async getActiveRecords(): BreedGetActiveRecords.Output {
    const result = await this.repo.find({where: {deleted_at: IsNull()} });

    const breeds: Breed[] = [];

    result.forEach(breed => {
      breeds.push(new Breed(breed));
    });

    return breeds;
  }

  async getInactiveRecords(): BreedGetInactiveRecords.Output {
    const result = await this.repo.find({where: {deleted_at: Not(IsNull())} });

    const breeds: Breed[] = [];

    result.forEach(breed => {
      breeds.push(new Breed(breed));
    });

    return breeds;
  }
}
