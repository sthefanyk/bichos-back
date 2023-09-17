import User from '../../../domain/entities/user';
import UserProps from '../../../domain/entities/user-props';
import IUserRepository from '../../../domain/contracts/user-repository.interface';
import { TypeormRepository } from '../../../shared/domain/repositories/typeorm.repository';
import UserModel from '../../../domain/models/user.model';
import NotFoundError from '../../../shared/domain/errors/not-found.error';

export class UserTypeormRepository
  extends TypeormRepository<UserProps, User, UserModel>
  implements IUserRepository
{
  async findByEmailAndPassword(email: string, password: string): Promise<UserModel> {
    const model = await this.repo.findOne({ where: { email, password } });

    if (!model) {
      throw new NotFoundError("User not found");
    }

    return model;
  }

  async findByEmail(email: string): Promise<UserModel> {
    const model = await this.repo.findOne({ where: { email } });

    if (!model) {
      throw new NotFoundError("User not found");
    }

    return model;
  }

  async resetPassword(id: string, newPassword: string): Promise<UserModel> {
    const user = await this._get(id);

    user.resetPassword(newPassword);
    
    const model = await this.repo.update(id, user.toJson());

    console.log(model.affected);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.repo.findOne({ where: { id: user.get('id').getUuid() }});
  }
}
