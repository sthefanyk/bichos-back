import { IsEnum, IsNotEmpty } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalAdoptAttr } from "./animal-adopt";
import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";

export class AnimalAdoptProps extends AnimalProps {

    @IsEnum(SizeAnimal)
    @IsNotEmpty()
    size_current: SizeAnimal;

    @IsEnum(SizeAnimal)
    @IsNotEmpty()
    size_estimated: SizeAnimal;

    constructor(
        props: AnimalAdoptAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.size_current = props.size_current;
        this.size_estimated = props.size_estimated;

        this.validate(this);
    }
}