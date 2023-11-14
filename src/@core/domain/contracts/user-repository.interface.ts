import { UserFindByEmail } from "src/@core/application/use-cases/user/find-by-email.usecase";
import { UserFindByUsername } from "src/@core/application/use-cases/user/find-by-username.usecase";
import UserModel from "../models/user.model";

export interface IUserRepository{
    findUserByEmail(email: string) : Promise<UserModel>;
    findUserById(id: string): Promise<UserModel>;
    findByEmail(email: string): UserFindByEmail.Output;
    findByUsername(username: string): UserFindByUsername.Output;
    resetPassword(id: string, newPassword: string): Promise<UserModel>;
}