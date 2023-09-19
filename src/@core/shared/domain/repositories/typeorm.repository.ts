import EntityProps from "../entities/entity-props";
import Entity from "../entities/entity";
import Model from "../../../domain/models/model";
import IRepository from "../../../domain/contracts/repository.interface";
import { IsNull, Not, Repository } from "typeorm";
import NotFoundError from "../errors/not-found.error";

export abstract class TypeormRepository<P extends EntityProps, E extends Entity<P>, M extends Model<P, E>>
  implements IRepository<P, E>
{
  constructor(protected repo: Repository<M>) {}

  async insert(entity: E): Promise<string> {
    await this.repo.save(entity.toJson() as any);
    return entity.get('id').toString();
  }

  async findById(id: string): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    const models = await this.repo.find();

    const entities: E[] = [];

    models.forEach((model) => {
      entities.push(model.getEntity(model));
    });

    return entities;
  }

  async getActiveRecords(): Promise<E[]> {
    const models = await this.repo.find({ where: { deleted_at: IsNull() } as any });

    const entities: E[] = [];

    models.forEach((model) => {
      entities.push(model.getEntity(model));
    });

    return entities;
  }

  async getInactiveRecords(): Promise<E[]> {
    const models = await this.repo.find({ where: { deleted_at: Not(IsNull()) } as any });

    const entities: E[] = [];

    models.forEach((model) => {
      entities.push(model.getEntity(model));
    });

    return entities;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.getProps().id.toString());
    await this.repo.update(entity.getProps().id.toString(), entity.toJson() as any);
  }

  async delete(id: string): Promise<void> {
    const _id = `${id}`;

    await this._get(_id);

    await this.repo.delete(_id).catch((error) => {
      throw new NotFoundError(error);
    });
  }

  protected async _get(id: string): Promise<E> {
    const model = await this.repo.findOne({ where: { id } as any });

    if (!model) {
      throw new NotFoundError('Entity Not Found using ID ' + id);
    }

    return model.getEntity(model);
  }

  protected async _find(id: string): Promise<E> {
    const model = await this.repo.findOne({ where: { id } as any });
    return model.getEntity(model);
  }
}