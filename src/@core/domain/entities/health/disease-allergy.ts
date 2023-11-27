import { DiseaseAllergyTypes } from "src/@core/shared/domain/enums/disease-allergy.enum";
import { DiseaseAllergyProps } from "./disease-allergy-props";

export type DiseaseAllergyAttr = {
    id?: string;
    name: string;
    description: string;
    type: DiseaseAllergyTypes;
}

export class DiseaseAllergy {
    private props: DiseaseAllergyProps;

    constructor(attr: DiseaseAllergyAttr){
        this.props = new DiseaseAllergyProps(attr);
    }

    toJson() {
        return { id: this.id, ...this.props };
    }

    get id(): string {
        return this.props.id.id;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get type(): DiseaseAllergyTypes {
        return this.props.type;
    }
}