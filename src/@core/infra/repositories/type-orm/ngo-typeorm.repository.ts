import { INGORepository } from '../../../domain/contracts/ngo-repository.interface';
import NGO from '../../../domain/entities/users/ngo';
import { DataSource, Repository } from 'typeorm';
import NGOModel from '../../../domain/models/ngo.model';
import UserModel from '../../../domain/models/user.model';
import { NGOMapper } from '../../../domain/mappers/ngo.mapper';
import { NGOCreate, NGOFindByCnpj, NGOFindById, NGOUpdate } from 'src/@core/application/use-cases/ngo';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';
import { CityModel } from 'src/@core/domain/models/city.model';
import { StateModel } from 'src/@core/domain/models/state.model';
import { UserTypeormRepository } from './user-typeorm.repository';
import { UserFindByEmail } from 'src/@core/application/use-cases/user/find-by-email.usecase';
import { UserFindByUsername } from 'src/@core/application/use-cases/user/find-by-username.usecase';

export class NGOTypeormRepository extends UserTypeormRepository implements INGORepository {
  private ngoRepo: Repository<NGOModel>;
  private userRepo: Repository<UserModel>;

  constructor(private dataSource: DataSource) {
    super(dataSource);
    this.ngoRepo = this.dataSource.getRepository(NGOModel);
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

  async insert(entity: NGO): NGOCreate.Output {
    const model = NGOMapper.getModel(entity);

    const user = await this.userRepo.save(model.user);
    const ngo = await this.ngoRepo.save(model);

    if (!user || !ngo) {
      throw new Error(`Could not save user`);
    }

    return {
      id: user.id,
      name_ngo: ngo.name_ngo,
      username: ngo.user.username,
      email: ngo.user.email
    };
  }

  async findById(id: string): NGOFindById.Output {
    const entity = await this._get(id);
    return entity;
  }

  async findByCnpj(cnpj: CNPJ): NGOFindByCnpj.Output {
    const model = await this.ngoRepo.findOne({
      where: { cnpj: cnpj.cnpj }
    });

    if (model) 
      return { id: model.id }

    return { id: '' };
  }

  async findAll(): Promise<NGO[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(NGOModel, 'ngo')
      .innerJoin(UserModel, 'user', 'ngo.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .getRawMany();

    const entities: NGO[] = [];

    result.forEach(async (res) => {
      entities.push(NGOMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async update(entity: NGO): NGOUpdate.Output {
    const model = NGOMapper.getModel(entity);

    const ngoUpdateResult = await this.ngoRepo.update(
      model.user.id, model
    );

    const userUpdateResult = await this.userRepo.update(
      model.user.id, model.user
    );

    if (ngoUpdateResult.affected === 0 || userUpdateResult.affected === 0) {
      throw new Error(
        `Could not update ngo with ID ${model.user.id}`,
      );
    }

    return {
      id: model.id,
      name_ngo: model.name_ngo,
      username: model.user.username,
      email: model.user.email
    }
  }

  async delete(id: string): Promise<void> {
    // const model = await this._get(id);

    // const userDeleteResult = await this.userRepo.delete({ id: model.id });
    // const ngoDeleteResult = await this.ngoRepo.delete({ user_id: model.id });

    // if (ngoDeleteResult.affected === 0 || userDeleteResult.affected === 0) {
    //   throw new Error(`Could not delete ngo with ID ${id}`);
    // }
  }

  async getActiveRecords(): Promise<NGO[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(NGOModel, 'ngo')
      .innerJoin(UserModel, 'user', 'ngo.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at IS NULL')
      .getRawMany();

    const entities: NGO[] = [];

    result.forEach(async (res) => {
      entities.push(NGOMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async getInactiveRecords(): Promise<NGO[]> {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(NGOModel, 'ngo')
      .innerJoin(UserModel, 'user', 'ngo.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('user.deleted_at NOT NULL')
      .getRawMany();

    const entities: NGO[] = [];

    result.forEach(async (res) => {
      entities.push(NGOMapper.getEntityWithJsonData(res));
    });

    return entities;
  }

  async _get(id: string) {
    const queryBuilder = this.dataSource.createQueryBuilder();
    const result = await queryBuilder
      .select()
      .from(NGOModel, 'ngo')
      .innerJoin(UserModel, 'user', 'ngo.id = user.id')
      .innerJoin(CityModel, 'city', 'user.city_name = city.name')
      .innerJoin(StateModel, 'state', 'city.state_name = state.name')
      .where('ngo.id = :id', { id })
      .getRawOne();

    // const result = await this.userRepo.findOne({ where: { id }, relations: ['city']})

    if (!result) {
      return null;
    }

    return NGOMapper.getEntityWithJsonData(result);
  }
}
