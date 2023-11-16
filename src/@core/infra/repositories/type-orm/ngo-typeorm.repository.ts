import { INGORepository } from '../../../domain/contracts/ngo-repository.interface';
import NGO from '../../../domain/entities/users/ngo';
import { DataSource, Repository } from 'typeorm';
import NGOModel from '../../../domain/models/ngo.model';
import UserModel from '../../../domain/models/user.model';
import { NGOCreate, NGOFindByCnpj, NGOFindById, NGOUpdate } from 'src/@core/application/use-cases/ngo';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';
import { UserTypeormRepository } from './user-typeorm.repository';
import { UserFindByEmail } from 'src/@core/application/use-cases/user/find-by-email.usecase';
import { UserFindByUsername } from 'src/@core/application/use-cases/user/find-by-username.usecase';
import { State } from 'src/@core/domain/entities/localization/state';
import { City } from 'src/@core/domain/entities/localization/city';

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

  async insert(entity: NGO): NGOCreate.Output {
    const user = await this.userRepo.save(entity.user);
    const ngo = await this.ngoRepo.save({...entity.toJson(), user});

    if (!user || !ngo) return null;

    return { id: user.id };
  }

  async findById(id: string): NGOFindById.Output { 
    return this._get(id);
  }

  async findByCnpj(cnpj: CNPJ): NGOFindByCnpj.Output {
    const model = await this.ngoRepo.findOne({
      where: { cnpj: cnpj.cnpj }
    });

    if (!model) return null;

    return { id: model.id };
  }

  async findAll(): Promise<NGO[]> {
    const models = await this.ngoRepo.find({
      relations: ['user', 'user.city', 'user.city.state']}
    )

    return this._convertAll(models);
  }

  async update(entity: NGO): NGOUpdate.Output {
    const userUpdateResult = await this.userRepo.update(
      entity.id, entity.user
    );

    const ngoUpdateResult = await this.ngoRepo.update(
      entity.id, {
        id: entity.id,
        cnpj: entity.cnpj,
        date_register: entity.date_register,
        name_ngo: entity.name_ngo
      }
    );

    if (ngoUpdateResult.affected === 0 || userUpdateResult.affected === 0)
      return null;
    
    return { id: entity.id }
  }

  async getActiveRecords(): Promise<NGO[]> {
    const models = await this.ngoRepo.createQueryBuilder('ngo')
      .leftJoinAndSelect('ngo.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at IS NULL')
      .getMany();

    return this._convertAll(models);
  }

  async getInactiveRecords(): Promise<NGO[]> {
    const models = await this.ngoRepo.createQueryBuilder('ngo')
      .leftJoinAndSelect('ngo.user', 'user')
      .leftJoinAndSelect('user.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .where('user.deleted_at NOT NULL')
      .getMany();

    return this._convertAll(models);
  }

  async _get(id: string) {
    const ngo = await this.ngoRepo.findOne({ 
      where: { id }, 
      relations: ['user', 'user.city', 'user.city.state']}
    )

    if (!ngo) return null;

    return new NGO({
      ...ngo,
      userAttr: {
        ...ngo.user,
        city: new City({ 
          ...ngo.user.city, 
          state: new State({ ...ngo.user.city.state })
        })
      }
    });
  }

  async _convertAll(models: NGOModel[]) {
    const ngos: NGO[] = [];

    models.forEach(ngo => {
      ngos.push(
        new NGO({
          ...ngo,
          userAttr: {
            ...ngo.user,
            city: new City({ 
              ...ngo.user.city, 
              state: new State({ ...ngo.user.city.state })
            })
          }
        })
      )
    })

    return ngos;
  }
}
