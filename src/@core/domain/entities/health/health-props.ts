import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { HealthAttr } from "./health";
import EntityPropsValidation from "src/@core/shared/domain/entities/entity-props-validation";
import { VaccineMedicine } from "./vaccine-medicine";
import { DiseaseAllergy } from "./disease-allergy";

export class HealthProps extends EntityPropsValidation {

    @IsBoolean()
    @IsNotEmpty()
    neutered: boolean;

    vaccines_medicines: VaccineMedicine[];

    disease_allergy: DiseaseAllergy[];

    @IsString()
    @IsOptional()
    additional: string;

    constructor(props:HealthAttr){
        super();
        this.neutered = props.neutered;
        this.vaccines_medicines = props.vaccines_medicines;
        this.disease_allergy = props.disease_allergy;
        this.additional = props.additional;

        this.validate(this);
    }
}