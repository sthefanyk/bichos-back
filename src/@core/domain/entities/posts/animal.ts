import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { AnimalProps } from "./animal-props";
import { Personality } from "../personality";

export type ImageAttr = {
    id: string;
    url?: string;
}

export type AnimalAttr = {
    name: string;
    sex: SexAnimal;
    date_birth: Date;
    species: Species;
    history?: string;
    characteristic?: string;
    personalities: Personality[];

    main_image: ImageAttr;
    second_image: ImageAttr;
    third_image: ImageAttr;
    fourth_image: ImageAttr;

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
            main_image: this.main_image,
            second_image: this.second_image,
            third_image: this.third_image,
            fourth_image: this.fourth_image,
            personalities: this.personalities.map(p => p.name)
        };
    }

    abstract updateStatus(status);

    abstract getStatus();

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

    get main_image(): ImageAttr {
        return {
            id: this.props.main_image.id,
            url: this.props.main_image.url
        };
    }

    get second_image(): ImageAttr {
        return {
            id: this.props.second_image.id,
            url: this.props.second_image.url
        };
    }

    get third_image(): ImageAttr {
        return {
            id: this.props.third_image.id,
            url: this.props.third_image.url
        };
    }

    get fourth_image(): ImageAttr {
        return {
            id: this.props.fourth_image.id,
            url: this.props.fourth_image.url
        };
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