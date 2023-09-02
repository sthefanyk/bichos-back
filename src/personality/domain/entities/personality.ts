import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

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
        super(props, id);
        this.props.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    update(name: string): void {
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
