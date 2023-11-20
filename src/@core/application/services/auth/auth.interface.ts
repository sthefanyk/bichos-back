import { UserModel } from "src/@core/domain/models";

export interface IAuth {
    singIn(email: string, password: string): Promise<{ accessToken: string }>;
    forget(email: string): Promise<object>;
    reset(token: string, password: string): Promise<{ accessToken: string }>;
    findUserById(id: string): Promise<UserModel>;
}