import { UserFindByEmail } from "src/@core/application/use-cases/user/find-by-email.usecase";
import { UserFindByUsername } from "src/@core/application/use-cases/user/find-by-username.usecase";
import { IUserRepository } from "src/@core/domain/contracts/user-repository.interface";
import UserModel from "src/@core/domain/models/user.model";
import { DataSource, Repository } from "typeorm";

export class UserTypeormRepository implements IUserRepository {
  private repo: Repository<UserModel>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(UserModel);
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    return this.repo.findOne({ where: { email } });
  }

  findUserById(id: string): Promise<UserModel> {
    return this.repo.findOne({ where: { id } });
  }
  
  findByEmail(email: string): UserFindByEmail.Output {
    return this.repo.findOne({ where: { email } });
  }

  findByUsername(username: string): UserFindByUsername.Output {
    return this.repo.findOne({ where: { username } });
  }

  async resetPassword(id: string, newPassword: string): Promise<UserModel> {
    const user = await this.findUserById(id);
    user.password = newPassword;

    const result = await this.repo.update(user.id, user);

    if (result.affected === 0) {
      throw new Error(
        `Could not update person with ID ${user.id}`,
      );
    }

    return user;
  }
}
