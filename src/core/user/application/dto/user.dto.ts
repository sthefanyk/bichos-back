import { User as UserModel } from "../../infra/repository/typeorm/User";
import { User as UserEntity } from "../../domain/entities/user";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export class UserDto {
  static getEntity(user: UserModel) {
    return new UserEntity(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        is_active: user.is_active,
        created_at: user.created_at,
      },
      new UniqueEntityId(user.id),
    );
  }

  static getModel(user: UserEntity) {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.name = user.props.name;
    userModel.email = user.props.email;
    userModel.password = user.props.password;
    userModel.is_active = user.props.is_active;
    userModel.created_at = user.props.created_at;

    return userModel;
  }
}
