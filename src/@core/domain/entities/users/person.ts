import User, { UserAttr } from "./user";
import PersonProps from "./person-props";
import { EntityMarker } from "../../../shared/domain/markers/entity.marker";
import { City } from "../localization/city";
import { Role } from "../../../shared/domain/enums/role.enum";

export type PersonAttr = {
    cpf: string,
    date_birth: Date,
}

export default class Person extends User implements EntityMarker {    
    constructor(
        props: PersonAttr,
        userProps: UserAttr
    ){
        userProps.role = Role.PERSON;
        super(new PersonProps(props, userProps));
    }

    public update(
        data: {
            cpf: string,
            date_birth: Date,
            fullName: string,
            username: string,
            email: string,
            password: string,
            city: City,
            description?: string
        }
    ) {
        this.props.cpf = data.cpf;
        this.props.date_birth = data.date_birth;
        this.props.fullName = data.fullName;
        this.props.username = data.username;
        this.props.city = data.city;
        this.props.email = data.email;
        this.props.password = data.password;
        this.props.description = data.description ?? this.props.description;
        this.props.updated_at = new Date();
        
        this.validateProps();
    }

    get cpf(): string {
        return this.props.cpf;
    }

    get date_birth(): Date {
        return this.props.date_birth;
    }
}