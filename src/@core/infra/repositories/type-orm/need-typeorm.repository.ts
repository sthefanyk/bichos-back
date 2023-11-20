import {
  NeedActivate,
  NeedFindById,
  NeedFindByName,
  NeedGetActiveRecords,
  NeedGetInactiveRecords,
  NeedInactivate,
  NeedSearch,
  NeedUpdate,
} from 'src/@core/application/use-cases/need';
import { INeedRepository } from 'src/@core/domain/contracts';
import { Need } from 'src/@core/domain/entities/need';
import { NeedModel } from 'src/@core/domain/models/need.model';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

export class NeedTypeormRepository implements INeedRepository {
  private repo: Repository<NeedModel>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(NeedModel);
  }

  async insert(entity: Need) {
    const need = await this.repo.save({
      name: entity.name,
      id: entity.id,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    });

    if (!need) {
      throw new Error(`Could not save need`);
    }

    return { id: need.id };
  }

  async update(entity: Need): NeedUpdate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      throw new Error(`Could not update need`);
    }

    return { id: entity.id, name: entity.name };
  }

  async findById(id: string): NeedFindById.Output {
    const need = await this.repo.findOne({ where: {id}});

    if (!need) {
      return null;
    }

    return new Need(need);
  }

  async findByName(name: string): NeedFindByName.Output {
    const need = await this.repo.findOne({ where: {name}});

    if (!need) {
      return null;
    }

    return new Need(need);
  }

  async activate(entity: Need): NeedActivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async inactivate(entity: Need): NeedInactivate.Output {
    const result = await this.repo.update(entity.id, entity.toJson());

    if (result.affected === 0) {
      return null;
    }

    return entity;
  }

  async findAll(): NeedSearch.Output {
    const result = await this.repo.find();

    const needs: Need[] = [];

    result.forEach(need => {
      needs.push(new Need(need));
    });

    return needs;
  }

  async getActiveRecords(): NeedGetActiveRecords.Output {
    const result = await this.repo.find({where: {deleted_at: IsNull()} });

    const needs: Need[] = [];

    result.forEach(need => {
      needs.push(new Need(need));
    });

    return needs;
  }

  async getInactiveRecords(): NeedGetInactiveRecords.Output {
    const result = await this.repo.find({where: {deleted_at: Not(IsNull())} });

    const needs: Need[] = [];

    result.forEach(need => {
      needs.push(new Need(need));
    });

    return needs;
  }
}
