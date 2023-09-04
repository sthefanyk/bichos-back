import { ValidationError } from "../errors/validation-error";

export class ValidatorRules {
    private constructor(private value: any, private property: string) {}

    static values(value: any, property: string) {
        return new ValidatorRules(value, property);
    }

    required(): this {
        if (
            this.value === null ||
            this.value === undefined ||
            this.value === ""
        ) {
            throw new ValidationError(`${this.property} is required`);
        }
        return this;
    }

    string(): this {
        if (!isEmpty(this.value) && typeof this.value !== "string") {
            throw new ValidationError(`${this.property} must be a string`);
        }
        return this;
    }

    maxLength(max: number): this {
        if (!isEmpty(this.value) && this.value.length > max) {
            throw new ValidationError(
                `${this.property} cannot be longer than ${max} characters`
            );
        }
        return this;
    }

    minLength(min: number): this {
        if (!isEmpty(this.value) && this.value.length < min) {
            throw new ValidationError(
                `${this.property} cannot be shorter than ${min} characters`
            );
        }
        return this;
    }

    boolean(): this {
        if (!isEmpty(this.value) && typeof this.value !== "boolean") {
            throw new ValidationError(`${this.property} must be a boolean`);
        }
        return this;
    }
}

export function isEmpty(value: any) {
    return value === undefined || value === null;
}

export default ValidatorRules;
