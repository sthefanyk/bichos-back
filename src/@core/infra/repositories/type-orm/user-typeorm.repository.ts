import User from '../../../domain/entities/users/user';
import UserProps from '../../../domain/entities/users/user-props';
import IUserRepository from '../../../domain/contracts/user-repository.interface';
import { TypeormRepository } from '../../../shared/domain/repositories/typeorm.repository';
import UserModel from '../../../domain/models/user.model';
import NotFoundError from '../../../shared/domain/errors/not-found.error';

export class UserTypeormRepository
  extends TypeormRepository<UserProps, User, UserModel>
  implements IUserRepository
{
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
    await user.generatePasswordHash();
    
    const model = await this.repo.update(id, user.toJson());

    if (!model.affected) {
      throw new NotFoundError("Error when changing password");
    }

    return this.repo.findOne({ where: { id: user.get('id').getUuid() }});
  }
}
