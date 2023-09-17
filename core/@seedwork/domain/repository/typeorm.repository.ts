import { Repository } from 'typeorm';
import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import {
  IAuthRepository,
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
  SortDirection,
} from './repository-contracts';
import Model from '../entity/model';

export abstract class TypeormRepository<E extends Entity, M extends Model>
  implements RepositoryInterface<E>
{
  constructor(private repo: Repository<M>) {}

  async insert(entity: E): Promise<void> {
    await this.repo.save(entity.toJSON() as any);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    const models = await this.repo.find();

    const entities: E[] = [];

    models.forEach((user) => {
      entities.push(user.toEntity(user));
    });

    return entities;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    await this.repo.update(entity.id, entity.toJSON());
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
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

    return model.toEntity(model);
  }
}

export abstract class TypeormSearchableRepository<
    E extends Entity,
    M extends Model,
  >
  extends TypeormRepository<E, M>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(
      await this.findAll(),
      props.filter,
    );
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir,
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
    custom_getter?: (sort: string, item: E) => any,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = custom_getter ? custom_getter(sort, a) : a.props[sort];
      const bValue = custom_getter ? custom_getter(sort, b) : b.props[sort];
      if (aValue < bValue) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
  ): Promise<E[]> {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}

export abstract class AuthTypeormService<E extends Entity, M extends Model>
  implements IAuthRepository<E>
{
  constructor(private repo: Repository<M>) {}

  async login(email: string, password: string): Promise<E> {
    const model = await this.repo.findOne({
      where: { email, password } as any,
    });

    if (!model) {
      throw new Error('Could not find');
    }

    return model.toEntity(model);
  }

  async forget(email: string): Promise<E> {
    const model = await this.repo.findOne({
      where: { email } as any,
    });

    if (!model) {
      throw new Error('Could not find');
    }

    return model.toEntity(model);
  }
}
