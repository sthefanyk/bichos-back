import EntityProps from "src/@core/shared/domain/entities/entity-props";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { AnimalAttr, ImageAttr } from "./animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { Personality } from "../personality";

export class AnimalProps extends EntityProps {

    @Length(2, 45)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(SexAnimal)
    @IsNotEmpty()
    sex: SexAnimal;

    @IsDate()
    @IsNotEmpty()
    date_birth: Date;

    @IsEnum(Species)
    @IsNotEmpty()
    species: Species;

    @MaxLength(255)
    @IsOptional()
    history?: string;

    @MaxLength(255)
    @IsOptional()
    characteristic?: string;

    @IsNotEmpty()
    personalities: Personality[];

    main_image: ImageAttr;
    second_image: ImageAttr;
    third_image: ImageAttr;
    fourth_image: ImageAttr;

    constructor(props: AnimalAttr){
        super(props.id, props.created_at, props.updated_at, props.deleted_at);
        this.name = props.name;
        this.sex = props.sex;
        this.date_birth = props.date_birth;
        this.species = props.species;
        this.history = props.history;
        this.characteristic = props.characteristic;
        this.personalities = props.personalities;
        this.main_image = props.main_image;
        this.second_image = props.second_image;
        this.third_image = props.third_image;
        this.fourth_image = props.fourth_image;
    }

}