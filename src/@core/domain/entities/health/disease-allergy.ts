import { DiseaseAllergyTypes } from "src/@core/shared/domain/enums/disease-allergy.enum";
import { DiseaseAllergyProps } from "./disease-allergy-props";

export type DiseaseAllergyAttr = {
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
        return { ...this.props };
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