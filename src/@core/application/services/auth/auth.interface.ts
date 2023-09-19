export interface IAuth {
    singIn(email: string, password: string): Promise<{ accessToken: string }>;
    forget(email: string): Promise<object>;
    reset(token: string, password: string): Promise<{ accessToken: string }>;
}