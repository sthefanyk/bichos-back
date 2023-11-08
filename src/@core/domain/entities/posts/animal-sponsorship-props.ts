import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";
import { AnimalAttr } from "./animal";
import { AnimalProps } from "./animal-props";
import { AnimalSponsorshipAttr } from "./animal-sponsorship";
import { Need } from "../need";

export class AnimalSponsorshipProps extends AnimalProps {

    @IsBoolean()
    @IsNotEmpty()
    accompany: boolean;

    @Length(2, 255)
    @IsString()
    @IsNotEmpty()
    reason_request: string;

    @IsNotEmpty()
    needs: Need[];

    constructor(
        props: AnimalSponsorshipAttr,
        animalProps: AnimalAttr
    ){
        super(animalProps);
        this.accompany = props.accompany;
        this.reason_request = props.reason_request;
        this.needs = props.needs;

        this.validate(this);
    }
}