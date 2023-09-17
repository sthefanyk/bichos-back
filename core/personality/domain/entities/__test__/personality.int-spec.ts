// import { omit } from "lodash";
// import ValidationError from "../../../../@seedwork/domain/errors/validation-error";
// import { EntityValidationError } from "../../../../@seedwork/domain/errors/validation-error";
import { Personality } from '../personality';

describe('Personality Integration Tests', () => {
  describe('created method', () => {
    it('should a invalid personality using name property', () => {
      expect(() => new Personality({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 3 characters',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => new Personality({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be longer than or equal to 3 characters',
        ],
      });

      expect(() => new Personality({ name: 'tt' })).containsErrorMessages({
        name: ['name must be longer than or equal to 3 characters'],
      });

      expect(
        () => new Personality({ name: 't'.repeat(256) }),
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });

      expect(() => new Personality({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be longer than or equal to 3 characters',
          'name must be shorter than or equal to 255 characters',
        ],
      });
    });

    it('should a invalid personality using is_active property', () => {
      expect(
        () => new Personality({ name: 'carinhoso', is_active: 'true' as any }),
      ).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });

    it('should a valid personality', () => {
      expect.assertions(0);

      new Personality({ name: 'Agitado' });
      new Personality({ name: 'Agitado', is_active: true });
      new Personality({ name: 'Agitado', is_active: false });

      const created_at = new Date();

      new Personality({
        name: 'Agitado',
        is_active: false,
        created_at,
      });
    });
  });

  describe('updated method', () => {
    it('should a invalid personality using name property', () => {
      const personality = new Personality({ name: 'carinhoso' });

      expect(() => personality.update(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be longer than or equal to 3 characters',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => personality.update('')).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be longer than or equal to 3 characters',
        ],
      });

      expect(() => personality.update('tt')).containsErrorMessages({
        name: ['name must be longer than or equal to 3 characters'],
      });

      expect(() => personality.update('t'.repeat(256))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });

      expect(() => personality.update(5 as any)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be longer than or equal to 3 characters',
          'name must be shorter than or equal to 255 characters',
        ],
      });
    });

    it('should a valid personality', () => {
      expect.assertions(0);

      const personality = new Personality({ name: 'carinhoso' });
      personality.update('Agitado');
    });
  });
});

// describe("Personality Integration Tests", () => {
//     describe("created method", () => {
//         it("should a invalid personality using name property", () => {
//             expect(() => new Personality({ name: null })).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => new Personality({ name: "" })).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => new Personality({ name: 5 as any })).toThrow(
//                 new ValidationError("name must be a string")
//             );

//             expect(() => new Personality({ name: "t".repeat(256) })).toThrow(
//                 new ValidationError("name cannot be longer than 255 characters")
//             );

//             expect(() => new Personality({ name: "tt" })).toThrow(
//                 new ValidationError("name cannot be shorter than 3 characters")
//             );
//         });

//         it("should a invalid personality using is_active property", () => {
//             expect(
//                 () =>
//                     new Personality({
//                         name: "carinhoso",
//                         is_active: "true" as any,
//                     })
//             ).toThrow(new ValidationError("is_active must be a boolean"));
//         });

//         it("should a valid personality", () => {

//             expect.assertions(0);

//             new Personality({ name: "Agitado" });
//             new Personality({ name: "Agitado", is_active: true});
//             new Personality({ name: "Agitado", is_active: false});

//             const created_at = new Date();

//             new Personality({
//                 name: "Agitado",
//                 is_active: false,
//                 created_at,
//             });

//         });
//     });

//     describe("updated method", () => {
//         it("should a invalid personality using name property", () => {
//             const personality = new Personality({ name: "carinhoso" });

//             expect(() => personality.update(null)).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => personality.update("")).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => personality.update(5 as any)).toThrow(
//                 new ValidationError("name must be a string")
//             );

//             expect(() => personality.update("t".repeat(256))).toThrow(
//                 new ValidationError("name cannot be longer than 255 characters")
//             );

//             expect(() => personality.update("tt")).toThrow(
//                 new ValidationError("name cannot be shorter than 3 characters")
//             );
//         });

//         it("should a valid personality", () => {

//             expect.assertions(0);

//             const personality = new Personality({ name: "carinhoso" });
//             personality.update("Agitado");
//         });
//     });
// });
