import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalAdoptAttr } from "./animal-adopt";
import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Health } from "../health/health";
import { StatusPostAdopt } from "src/@core/shared/domain/enums/status_post_adopt.enum";

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

    @IsEnum(StatusPostAdopt)
    status: StatusPostAdopt;

    @IsNotEmpty()
    update_status_at: Date;

    constructor(
        props: AnimalAdoptAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.size_current = props.size_current;
        this.size_estimated = props.size_estimated;
        this.breed = props.breed;
        this.health = props.health;
        this.status = this.status ?? StatusPostAdopt.WAITING_QUESTIONNAIRES;
        this.update_status_at = props.update_status_at ?? new Date();

        this.validate(this);
    }
}