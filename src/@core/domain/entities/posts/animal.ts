import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { AnimalProps } from "./animal-props";
import { Personality } from "../personality";

export type AnimalAttr = {
    name: string;
    sex: SexAnimal;
    date_birth: Date;
    species: Species;
    history?: string;
    characteristic?: string;
    personalities: Personality[];

    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export abstract class Animal {
    constructor(private props: AnimalProps){}

    toJson() {
        return { 
            ...this.props, 
            id: this.id,
            personalities: this.personalities.map(p => p.toJson())
        };
    }

    abstract checkStatus();

    get name(): string {
        return this.props.name;
    }

    get sex(): SexAnimal {
        return this.props.sex;
    }

    get date_birth(): Date {
        return this.props.date_birth;
    }

    get species(): Species {
        return this.props.species;
    }

    get history(): string {
        return this.props.history;
    }

    get characteristic(): string {
        return this.props.characteristic;
    }

    get personalities(): Personality[] {
        return this.props.personalities;
    }

    get id(): string {
        return this.props.id.id;
    }

    get created_at(): Date {
        return this.props.created_at;
    }

    get updated_at(): Date {
        return this.props.updated_at;
    }

    get deleted_at(): Date {
        return this.props.deleted_at;
    }
}