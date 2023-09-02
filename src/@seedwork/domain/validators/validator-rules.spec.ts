import { Omit } from "lodash";
import ValidationError from "../../../@seedwork/errors/validation.error";
import ValidatorRules from "./validator-rules";

type Values = {
    value: any;
    property: string;
};

type ExpectedRule = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[];
};

function assertIsInvalid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected);
    }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected);
    }).not.toThrow(expected.error);
}

function runRule({
    value,
    property,
    rule,
    params = [],
}: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
}

describe("ValidatorRules Unit Test", () => {
    test("values method", () => {
        const validator = ValidatorRules.values("some value", "field");
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator["value"]).toBe("some value");
        expect(validator["property"]).toBe("field");
    });

    test("required validation rule", () => {

        const error = new ValidationError("field is required");
        const rule = "required";

        // invalid cases
        let arrange: Values[] = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "", property: "field" }
        ];

        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });

        //valid cases
        arrange = [
            { value: "test", property: "field" },
            { value: 5, property: "field" },
            { value: 0, property: "field" },
            { value: false, property: "field" }
        ];

        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });
    });

    test("string validation rule", () => {

        const error = new ValidationError("field must be a string");
        const rule = "string";

        // invalid cases
        let arrange: Values[] = [
            { value: 5, property: "field" },
            { value: {}, property: "field" },
            { value: false, property: "field" }
        ];

        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });

        //valid cases
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "test", property: "field" },
            { value: "5", property: "field" },
            { value: "0", property: "field" }
        ];

        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });
    });

    test("boolean validation rule", () => {
        const error = new ValidationError("field must be a boolean");
        const rule = "boolean";

        // invalid cases
        let arrange: Values[] = [
            { value: 5, property: "field" },
            { value: 0, property: "field" },
            { value: 1, property: "field" },
            { value: {}, property: "field" },
            { value: "false", property: "field" },
            { value: "true", property: "field" },
            { value: [], property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });

        //valid cases
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: false, property: "field" },
            { value: true, property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule,
                error,
            });
        });
    });

    test("maxLength validation rule", () => {
        const error = new ValidationError("field cannot be longer than 3 characters");
        const rule = "maxLength";


        // invalid cases
        let arrange: Values[] = [
            { value: "test", property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule,
                error,
                params: [3]
            });
        });

        //valid cases
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "aaa", property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule,
                error,
                params: [3]
            });
        });
    });

    test("minLength validation rule", () => {
        const rule = "minLength";

        // invalid cases
        let arrange: Values[] = [
            { value: "aa", property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule,
                error: new ValidationError("field cannot be shorter than 3 characters"),
                params: [3]
            });
        });

        //valid cases
        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "test", property: "field" },
        ];

        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule,
                error: new ValidationError("field cannot be shorter than 4 characters"),
                params: [3]
            });
        });
    });

    it("should throw a validation error when combine two or more validation rules", () => {
        let validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("field must be a string"));

        validator = ValidatorRules.values("123456", "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("field cannot be longer than 5 characters"));

        validator = ValidatorRules.values("1234", "field");
        expect(() => {
            validator.required().string().minLength(5);
        }).toThrow(new ValidationError("field cannot be shorter than 5 characters"));

        validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError("field must be a boolean"));

    });
    
    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0);
        ValidatorRules.values("test", "field").required().string();
        ValidatorRules.values("12345", "field").required().string().maxLength(5);
        ValidatorRules.values("12345", "field").required().string().minLength(5);
        ValidatorRules.values(true, "field").required().boolean();
        ValidatorRules.values(false, "field").required().boolean();
    });
});