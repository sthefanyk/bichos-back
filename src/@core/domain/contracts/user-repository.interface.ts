import { UserFindByEmail } from "src/@core/application/use-cases/user/find-by-email.usecase";
import { UserFindByUsername } from "src/@core/application/use-cases/user/find-by-username.usecase";

export default interface IUserRepository{
    findByEmail(email: string): UserFindByEmail.Output;
    findByUsername(username: string): UserFindByUsername.Output;
    resetPassword(id: string, newPassword: string);
}