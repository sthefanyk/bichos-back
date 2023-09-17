import User from "../entities/user";
import UserProps from "../entities/user-props";
import UserModel from "../models/user.model";
import IRepository from "./repository.interface";

export default interface IUserRepository extends IRepository<UserProps, User>{
    findByEmailAndPassword(email: string, password: string): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel>;
    resetPassword(id: string, newPassword: string): Promise<UserModel>;
}