import { Mapper } from "src/@core/domain/mappers/mapper";
import UserModel from "src/@core/domain/models/user.model";
import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";
import { ModelMarker } from "src/@core/shared/domain/markers/model.marker";
import { DataSource, Repository } from "typeorm";

export class UserTypeormRepository<
  Model extends ModelMarker,
  Entity extends EntityMarker,
  Mappers extends Mapper<Entity, Model>,

> {
  private repo: Repository<Model>;
  private userRepo: Repository<UserModel>;

  constructor(
    private dataSource: DataSource,
    private modelClass: new () => Model,
    private mapper: Mappers,
  ) {
    this.repo = this.dataSource.getRepository(modelClass);
    this.userRepo = this.dataSource.getRepository(UserModel);
  }

  // async insert(entity: Entity): PersonCreate.Output {
  //   const model = this.mapper.getModel(entity);

  //   const user = await this.userRepo.save((model as any).user);
  //   const modelResult = await this.repo.save(model);

  //   if (!user || !modelResult) {
  //     throw new Error(`Could not save user`);
  //   }

  //   return {
  //     id: user.id,
  //     name: person.user.full_name,
  //     email: person.user.email
  //   };
  // }
}
