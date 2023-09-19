import { IsString, Length } from "class-validator";

export class StateProps {

    @IsString()
    @Length(2, 45)
    name: string;

    @IsString()
    @Length(2, 2)
    abbreviation: string;

    constructor() {

    }
}