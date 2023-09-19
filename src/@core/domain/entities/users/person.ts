import User from "./user";
import UserProps, { UserAttr } from "./user-props";

export default class Person extends User {
    constructor(props: UserAttr){
        super(new UserProps({
            fullName: 
        }));
        
    }
    public update(name: string, email: string, password: string): void {
        
    }
}