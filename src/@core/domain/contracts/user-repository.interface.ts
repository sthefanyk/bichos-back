import User from "../entities/users/user";
import UserProps from "../entities/users/user-props";
import UserModel from "../models/user.model";
import IRepository from "./repository.interface";

export default interface IUserRepository extends IRepository<UserProps, User>{
    findByEmail(email: string): Promise<UserModel>;
    resetPassword(id: string, newPassword: string): Promise<UserModel>;
}