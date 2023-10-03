import Entity from "src/@core/shared/domain/entities/entity";
import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { AnimalProps } from "./animal-props";

export type AnimalAttr = {
    name: string;
    sex: SexAnimal;
    date_birth: Date;
    species: Species;
    history?: string;
    characteristic?: string;

    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export abstract class Animal extends Entity<AnimalProps> {
    constructor(props: AnimalProps){
        super(props);
    }   
}