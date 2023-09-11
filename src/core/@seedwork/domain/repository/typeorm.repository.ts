import { Repository } from 'typeorm';
import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
  SortDirection,
} from './repository-contracts';
import { User as Model } from '../../../user/infra/repository/typeorm/User';
import { TypeORM } from '../../../../database/data-source';
import { UserDto } from '../../../user/application/dto/user.dto';

export abstract class TypeormRepository<E extends Entity>
  implements RepositoryInterface<E>
{  
  private repo: Repository<Model>;

  constructor(){
    this.initializeRepo();
  }

  private async initializeRepo() {
    this.repo = await TypeORM.DataSource<Model>(Model);
  }

  async insert(entity: E): Promise<void> {
    const userModel = UserDto.getModel(entity as any);
    await this.repo.save(userModel);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    const usersModel = await this.repo.find();

    const usersEntity: E[] = [];
    
    usersModel.forEach((user) => {
      usersEntity.push(UserDto.getEntity(user) as any);
    });
    
    return usersEntity;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    await this.repo.update(entity.id, UserDto.getModel(entity as any));
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;

    await this._get(_id);

    await this.repo.delete(_id).catch((error) => {
      throw new NotFoundError(error);
    });
  }

  protected async _get(id: string): Promise<E> {
    const user = await this.repo.findOne({ where: { id }});

    if (!user) {
      throw new NotFoundError('Entity Not Found using ID ' + id);
    }

    return UserDto.getEntity(user) as any;
  }
}

export abstract class TypeormSearchableRepository<E extends Entity>
  extends TypeormRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(await this.findAll(), props.filter);
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
