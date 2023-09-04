import { omit } from "lodash";
import ValidationError from "../../../../@seedwork/errors/validation.error";
import { Personality } from "../personality";

describe("Personality Integration Tests", () => {
    describe("created method", () => {
        it("should a invalid personality using name property", () => {
            expect(() => new Personality({ name: null })).toThrow(
                new ValidationError("name is required")
            );

            expect(() => new Personality({ name: "" })).toThrow(
                new ValidationError("name is required")
            );

            expect(() => new Personality({ name: 5 as any })).toThrow(
                new ValidationError("name must be a string")
            );

            expect(() => new Personality({ name: "t".repeat(256) })).toThrow(
                new ValidationError("name cannot be longer than 255 characters")
            );

            expect(() => new Personality({ name: "tt" })).toThrow(
                new ValidationError("name cannot be shorter than 3 characters")
            );
        });

        it("should a invalid personality using is_active property", () => {
            expect(
                () =>
                    new Personality({
                        name: "carinhoso",
                        is_active: "true" as any,
                    })
            ).toThrow(new ValidationError("is_active must be a boolean"));
        });

        it("should a valid personality", () => {

            expect.assertions(0);

            new Personality({ name: "Agitado" });
            new Personality({ name: "Agitado", is_active: true});
            new Personality({ name: "Agitado", is_active: false});

            const created_at = new Date();

            new Personality({
                name: "Agitado",
                is_active: false,
                created_at,
            });
            
        });
    });

    describe("updated method", () => {
        it("should a invalid personality using name property", () => {
            const personality = new Personality({ name: "carinhoso" });

            expect(() => personality.update(null)).toThrow(
                new ValidationError("name is required")
            );

            expect(() => personality.update("")).toThrow(
                new ValidationError("name is required")
            );

            expect(() => personality.update(5 as any)).toThrow(
                new ValidationError("name must be a string")
            );

            expect(() => personality.update("t".repeat(256))).toThrow(
                new ValidationError("name cannot be longer than 255 characters")
            );

            expect(() => personality.update("tt")).toThrow(
                new ValidationError("name cannot be shorter than 3 characters")
            );
        });

        it("should a valid personality", () => {

            expect.assertions(0);

            const personality = new Personality({ name: "carinhoso" });
            personality.update("Agitado");            
        });
    });
});
