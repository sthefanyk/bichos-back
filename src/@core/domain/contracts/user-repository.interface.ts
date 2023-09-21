import User from "../entities/users/user";
import IRepository from "./repository.interface";

export default interface IUserRepository<U extends User> extends IRepository<U>{
    findByEmail(email: string);
    resetPassword(id: string, newPassword: string);
}