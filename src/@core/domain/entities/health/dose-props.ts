import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { DoseAttr } from "./dose";
import EntityPropsValidation from "src/@core/shared/domain/entities/entity-props-validation";

export class DoseProps extends EntityPropsValidation {

    @IsNumber()
    @IsNotEmpty()
    number_dose: number;
    
    @IsDate()
    @IsNotEmpty()
    application_date: Date;

    @IsBoolean()
    @IsNotEmpty()
    applied: boolean;

    constructor(props: DoseAttr){
        super();
        this.number_dose = props.number_dose;
        this.application_date = props.application_date;
        this.applied = props.applied;

        this.validate(this);
    }
}