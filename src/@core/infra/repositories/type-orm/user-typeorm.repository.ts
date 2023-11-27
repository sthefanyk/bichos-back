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
import { GalleryTypeormRepository } from "./gallery-typeorm.repository";
import { PersonTypeormRepository } from "./person-typeorm.repository";
import { ShelterTypeormRepository } from "./shelter-typeorm.repository";
import { NGOTypeormRepository } from "./ngo-typeorm.repository";
import { Role } from "src/@core/shared/domain/enums/role.enum";

export class UserImpl extends User implements EntityMarker {
  constructor(user: UserAttr) {
    const props = new UserProps(user);
    super(props);
  }
}

export class UserTypeormRepository implements IUserRepository {
  private repo: Repository<UserModel>;
  private repoCity: Repository<CityModel>;
  protected repoGallery: GalleryTypeormRepository;
  protected RepoPerson: PersonTypeormRepository;
  protected RepoShelter: ShelterTypeormRepository;
  protected RepoNGO: NGOTypeormRepository;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(UserModel);
    this.repoCity = dataSource.getRepository(CityModel);
    this.repoGallery = new GalleryTypeormRepository(dataSource);
    this.RepoPerson = new PersonTypeormRepository(dataSource);
    this.RepoShelter = new ShelterTypeormRepository(dataSource);
    this.RepoNGO = new NGOTypeormRepository(dataSource);
  }
  
  async findAllUser(): UserSearch.Output {
    const models = await this.repo.find({ relations: ['city']});

    const users: User[] = [];

    for (const user of models) {
      const city = await this.repoCity.findOne({ 
        where: { name: user.city.name },
        relations: ['state']
      });

      const profile_picture = await this.repoGallery.getImageUrl(user.profile_picture);
      const header_picture = await this.repoGallery.getImageUrl(user.header_picture);

      if(user.role === Role.PERSON){
        const aux = await this.RepoPerson.findById(user.id);
        users.push(aux);
      } else if(user.role === Role.SHELTER){
        const aux = await this.RepoShelter.findById(user.id);
        users.push(aux);
      } else if(user.role === Role.NGO){
        const aux = await this.RepoNGO.findById(user.id);
        users.push(aux);
      } else {
        users.push(new UserImpl({
          ...user,
          role: +user.role,
          profile_picture: { id: user.profile_picture, url: profile_picture.url },
          header_picture: { id: user.header_picture, url: header_picture.url },
          city: new City({...city, state: new State({...city.state})}),
        }));
      }
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

    const profile_picture = await this.repoGallery.getImageUrl(user.profile_picture);
    const header_picture = await this.repoGallery.getImageUrl(user.header_picture);

    if(user.role === Role.PERSON)
      return this.RepoPerson.findById(user.id);

    if(user.role === Role.SHELTER)
      return this.RepoShelter.findById(user.id);

    if(user.role === Role.NGO)
      return this.RepoNGO.findById(user.id);

    return new UserImpl({
      ...user,
      role: +user.role,
      profile_picture: { id: user.profile_picture, url: profile_picture.url },
      header_picture: { id: user.header_picture, url: header_picture.url },
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

    const profile_picture = await this.repoGallery.getImageUrl(user.profile_picture);
    const header_picture = await this.repoGallery.getImageUrl(user.header_picture);

    if(user.role === Role.PERSON)
      return this.RepoPerson.findById(user.id);

    if(user.role === Role.SHELTER)
      return this.RepoShelter.findById(user.id);

    if(user.role === Role.NGO)
      return this.RepoNGO.findById(user.id);

    return new UserImpl({
      ...user,
      role: +user.role,
      profile_picture: { id: user.profile_picture, url: profile_picture.url },
      header_picture: { id: user.header_picture, url: header_picture.url },
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

    const profile_picture = await this.repoGallery.getImageUrl(user.profile_picture);
    const header_picture = await this.repoGallery.getImageUrl(user.header_picture);

    if(user.role === Role.PERSON)
      return this.RepoPerson.findById(user.id);

    if(user.role === Role.SHELTER)
      return this.RepoShelter.findById(user.id);

    if(user.role === Role.NGO)
      return this.RepoNGO.findById(user.id);

    return new UserImpl({
      ...user,
      profile_picture: { id: user.profile_picture, url: profile_picture.url },
      header_picture: { id: user.header_picture, url: header_picture.url },
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
