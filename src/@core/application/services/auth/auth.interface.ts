export interface IAuth {
    singIn(email: string, password: string): Promise<string>;
    forget(email: string): Promise<object>;
    reset(token: string, password: string): Promise<string>;
}