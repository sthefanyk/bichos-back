import { IsEnum, IsNotEmpty } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalAdoptAttr } from "./animal-adopt";
import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";

export class AnimalAdoptProps extends AnimalProps {

    @IsEnum(SizeAnimal)
    @IsNotEmpty()
    size: SizeAnimal;

    constructor(
        props: AnimalAdoptAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.size = props.size;

        this.validate(this);
    }
}