import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalAdoptAttr } from "./animal-adopt";
import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Health } from "../health/health";

export class AnimalAdoptProps extends AnimalProps {

    @IsEnum(SizeAnimal)
    @IsNotEmpty()
    size_current: SizeAnimal;

    @IsEnum(SizeAnimal)
    @IsNotEmpty()
    size_estimated: SizeAnimal;

    @IsString()
    @IsNotEmpty()
    breed: string;

    @IsNotEmpty()
    health: Health;

    constructor(
        props: AnimalAdoptAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.size_current = props.size_current;
        this.size_estimated = props.size_estimated;
        this.breed = props.breed;
        this.health = props.health;

        this.validate(this);
    }
}