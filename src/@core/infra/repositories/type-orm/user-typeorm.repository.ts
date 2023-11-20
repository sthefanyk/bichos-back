import { UserFindByEmail, UserFindById } from "src/@core/application/use-cases/user";
import { UserFindByUsername } from "src/@core/application/use-cases/user/find-by-username.usecase";
import { UserSearch } from "src/@core/application/use-cases/user/search.usecase";
import { IUserRepository } from "src/@core/domain/contracts/user-repository.interface";
import { City } from "src/@core/domain/entities/localization/city";
import { State } from "src/@core/domain/entities/localization/state";
import User, { UserAttr } from "src/@core/domain/entities/users/user";
import UserProps from "src/@core/domain/entities/users/user-props";
import { UserModel, CityModel } from "src/@core/domain/models";
import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";
import { DataSource, Repository } from "typeorm";

export class UserImpl extends User implements EntityMarker {
  constructor(user: UserAttr) {
    const props = new UserProps(user);
    super(props);
  }
}

export class UserTypeormRepository implements IUserRepository {
  private repo: Repository<UserModel>;
  private repoCity: Repository<CityModel>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(UserModel);
    this.repoCity = dataSource.getRepository(CityModel);
  }
  
  async findAllUser(): UserSearch.Output {
    const models = await this.repo.find({ relations: ['city']});

    const users: User[] = [];

    for (const user of models) {
      const city = await this.repoCity.findOne({ 
        where: { name: user.city.name },
        relations: ['state']
      });

      users.push(new UserImpl({
        ...user,
        role: +user.role,
        city: new City({...city, state: new State({...city.state})}),
      }));
    }

    return users
  }

  async findUserById(id: string): UserFindById.Output {
    const user = await this.repo.findOne({ 
      where: { id }, 
      relations: ['city'] 
    });

    if(!user) return null;


    const city = await this.repoCity.findOne({ 
      where: { name: user.city.name },
      relations: ['state']
    });

    return new UserImpl({
      ...user,
      role: +user.role,
      city: new City({...city, state: new State({...city.state})}),
    })
  }

  async findUserByEmail(email: string): UserFindByEmail.Output {
    const user = await this.repo.findOne({ 
      where: { email }, 
      relations: ['city'] 
    });

    if(!user) return null;

    const city = await this.repoCity.findOne({ 
      where: { name: user.city.name },
      relations: ['state']
    });

    return new UserImpl({
      ...user,
      role: +user.role,
      city: new City({...city, state: new State({...city.state})}),
    });
  }

  async findUserByUsername(username: string): UserFindByUsername.Output {
    const user = await this.repo.findOne({ 
      where: { username }, 
      relations: ['city'] 
    });

    if(!user) return null;

    const city = await this.repoCity.findOne({ 
      where: { name: user.city.name },
      relations: ['state']
    });

    return new UserImpl({
      ...user,
      role: +user.role,
      city: new City({...city, state: new State({...city.state})}),
    });
  }

  async resetPassword(user: User): Promise<User> {
    const userUpdateResult = await this.repo.update(
      user.id, { password: user.password }
    );

    if (userUpdateResult.affected === 0)
      return null;

    return user;
  }
}
