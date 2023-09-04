// import ValidatorRules from "../../../@seedwork/domain/validators/validator-rules";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import PersonalityValidatorFactory from "../validators/personality.validator";

export type PersonalityProps = {
    name: string;
    is_active?: boolean;
    created_at?: Date;
};

// export type PersonalityPropsJson = Required<{ id: string } & PersonalityProps>;

// export class PersonalityId extends UniqueEntityId{

// }

export class Personality extends Entity<PersonalityProps> {
    constructor(public readonly props: PersonalityProps, id?: UniqueEntityId) {
        Personality.validate(props);
        super(props, id);
        this.props.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    // static validate(props: Omit<PersonalityProps, 'id' | 'created_at'>) {
    //     ValidatorRules.values(props.name, "name").required().string().maxLength(255).minLength(3);
    //     ValidatorRules.values(props.is_active, "is_active").boolean();
    // }

    static validate(props: PersonalityProps){
        const validator = PersonalityValidatorFactory.create();
        if (!validator.validate(props)) throw new EntityValidationError(validator.errors);
    }

    update(name: string): void {
        Personality.validate({ name, is_active: this.is_active });
        this.name = name;
    }

    activate() {
        this.props.is_active = true;
    }

    deactivate() {
        this.props.is_active = false;
    }

    get name() {
        return this.props.name;
    }

    private set name(name: string) {
        this.props.name = name;
    }

    get is_active() {
        return this.props.is_active;
    }

    get created_at() {
        return this.props.created_at;
    }
}
