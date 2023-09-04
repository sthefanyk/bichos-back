import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";
import { PersonalityProps } from "../entities/personality";

export class PersonalityRules {
    @MaxLength(255)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({ name, is_active, created_at }: PersonalityProps) {
        Object.assign(this, { name, is_active, created_at });
    }
}

export class PersonalityValidator extends ClassValidatorFields<PersonalityRules> {
    validate(data: PersonalityProps): boolean {
        return super.validate(new PersonalityRules(data ?? ({} as any)));
    }
}

export class PersonalityValidatorFactory {
    static create() {
        return new PersonalityValidator();
    }
}

export default PersonalityValidatorFactory;
