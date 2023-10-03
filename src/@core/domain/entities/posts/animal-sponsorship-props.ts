import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalSponsorshipAttr } from "./animal-sponsorship";

export class AnimalSponsorshipProps extends AnimalProps {

    @IsBoolean()
    @IsNotEmpty()
    accompany: boolean;

    @Length(2, 255)
    @IsString()
    @IsNotEmpty()
    reason_request: string;

    constructor(
        props: AnimalSponsorshipAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.accompany = props.accompany;
        this.reason_request = props.reason_request;

        this.validate(this);
    }
}