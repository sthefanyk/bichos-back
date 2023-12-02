import {
  PersonalityActivate,
  PersonalityFindById,
  PersonalityFindByName,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords,
  PersonalityInactivate,
  PersonalitySearch,
  PersonalityUpdate,
} from '../../../application/use-cases/personality';
import { IPersonalityRepository } from '../../../domain/contracts';
import { Personality } from '../../../domain/entities/personality';
import { PersonalityModel } from '../../../domain/models/personality.model';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

export class PersonalityTypeormRepository implements IPersonalityRepository {
  private repo: Repository<PersonalityModel>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(PersonalityModel);
  }

  async insert(entity: Personality) {
    const personality = await this.repo.save({
      name: entity.name,
      id: entity.id,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    });

    if (!personality) {
      throw new Error(`Could not save personality`);
    }

    return { id: personality.id };
  }

  async update(entity: Personality): PersonalityUpdate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      throw new Error(`Could not update personality`);
    }

    return { id: entity.id, name: entity.name };
  }

  async findById(id: string): PersonalityFindById.Output {
    const personality = await this.repo.findOne({ where: { id } });

    if (!personality) {
      return null;
    }

    return new Personality(personality);
  }

  async findByName(name: string): PersonalityFindByName.Output {
    const personality = await this.repo.findOne({ where: { name } });

    if (!personality) {
      return null;
    }

    return new Personality(personality);
  }

  async activate(entity: Personality): PersonalityActivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async inactivate(entity: Personality): PersonalityInactivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async findAll(): PersonalitySearch.Output {
    const result = await this.repo.find();

    const personalities: Personality[] = [];

    result.forEach((personality) => {
      personalities.push(new Personality(personality));
    });

    return personalities;
  }

  async getActiveRecords(): PersonalityGetActiveRecords.Output {
    const result = await this.repo.find({ where: { deleted_at: IsNull() } });

    const personalities: Personality[] = [];

    result.forEach((personality) => {
      personalities.push(new Personality(personality));
    });

    return personalities;
  }

  async getInactiveRecords(): PersonalityGetInactiveRecords.Output {
    const result = await this.repo.find({
      where: { deleted_at: Not(IsNull()) },
    });

    const personalities: Personality[] = [];

    result.forEach((personality) => {
      personalities.push(new Personality(personality));
    });

    return personalities;
  }
}
