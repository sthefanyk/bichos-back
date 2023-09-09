// import { omit } from "lodash";
// import ValidationError from "../../../../@seedwork/domain/errors/validation-error";
// import { EntityValidationError } from "../../../../@seedwork/domain/errors/validation-error";
import { User } from '../user';

describe('User Integration Tests', () => {
  describe('created method', () => {
    // it('should a invalid user using name property', () => {
    //   expect(() => new User({ name: null })).containsErrorMessages({
    //     name: [
    //       'name should not be empty',
    //       'name must be a string',
    //       'name must be longer than or equal to 3 characters',
    //       'name must be shorter than or equal to 255 characters',
    //     ],
    //   });

    //   expect(() => new User({ name: '' })).containsErrorMessages({
    //     name: [
    //       'name should not be empty',
    //       'name must be longer than or equal to 3 characters',
    //     ],
    //   });

    //   expect(() => new User({ name: 'tt' })).containsErrorMessages({
    //     name: ['name must be longer than or equal to 3 characters'],
    //   });

    //   expect(
    //     () => new User({ name: 't'.repeat(256) }),
    //   ).containsErrorMessages({
    //     name: ['name must be shorter than or equal to 255 characters'],
    //   });

    //   expect(() => new User({ name: 5 as any })).containsErrorMessages({
    //     name: [
    //       'name must be a string',
    //       'name must be longer than or equal to 3 characters',
    //       'name must be shorter than or equal to 255 characters',
    //     ],
    //   });
    // });

    it('should a invalid user using is_active property', () => {
      expect(
        () => new User({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: 'true' as any }),
      ).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });

    it('should a valid user', () => {
      expect.assertions(0);

      new User({ name: 'name', email: 'email@example.com', password: 'Password1' });
      new User({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: true });
      new User({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: false });

      const created_at = new Date();

      new User({
        name: 'name', 
        email: 'email@example.com', 
        password: 'Password1',
        is_active: false,
        created_at,
      });
    });
  });

  describe('updated method', () => {
    // it('should a invalid user using name property', () => {
    //   const user = new User({ name: 'carinhoso' });

    //   expect(() => user.update(null)).containsErrorMessages({
    //     name: [
    //       'name should not be empty',
    //       'name must be a string',
    //       'name must be longer than or equal to 3 characters',
    //       'name must be shorter than or equal to 255 characters',
    //     ],
    //   });

    //   expect(() => user.update('')).containsErrorMessages({
    //     name: [
    //       'name should not be empty',
    //       'name must be longer than or equal to 3 characters',
    //     ],
    //   });

    //   expect(() => user.update('tt')).containsErrorMessages({
    //     name: ['name must be longer than or equal to 3 characters'],
    //   });

    //   expect(() => user.update('t'.repeat(256))).containsErrorMessages({
    //     name: ['name must be shorter than or equal to 255 characters'],
    //   });

    //   expect(() => user.update(5 as any)).containsErrorMessages({
    //     name: [
    //       'name must be a string',
    //       'name must be longer than or equal to 3 characters',
    //       'name must be shorter than or equal to 255 characters',
    //     ],
    //   });
    // });

    it('should a valid user', () => {
      expect.assertions(0);

      const user = new User({ name: 'name', email: 'email@example.com', password: 'Password1' });
      user.update('other name', 'otheremail@example.com', 'otherPassword1');
    });
  });
});

// describe("User Integration Tests", () => {
//     describe("created method", () => {
//         it("should a invalid user using name property", () => {
//             expect(() => new User({ name: null })).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => new User({ name: "" })).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => new User({ name: 5 as any })).toThrow(
//                 new ValidationError("name must be a string")
//             );

//             expect(() => new User({ name: "t".repeat(256) })).toThrow(
//                 new ValidationError("name cannot be longer than 255 characters")
//             );

//             expect(() => new User({ name: "tt" })).toThrow(
//                 new ValidationError("name cannot be shorter than 3 characters")
//             );
//         });

//         it("should a invalid user using is_active property", () => {
//             expect(
//                 () =>
//                     new User({
//                         name: "carinhoso",
//                         is_active: "true" as any,
//                     })
//             ).toThrow(new ValidationError("is_active must be a boolean"));
//         });

//         it("should a valid user", () => {

//             expect.assertions(0);

//             new User({ name: "Agitado" });
//             new User({ name: "Agitado", is_active: true});
//             new User({ name: "Agitado", is_active: false});

//             const created_at = new Date();

//             new User({
//                 name: "Agitado",
//                 is_active: false,
//                 created_at,
//             });

//         });
//     });

//     describe("updated method", () => {
//         it("should a invalid user using name property", () => {
//             const user = new User({ name: "carinhoso" });

//             expect(() => user.update(null)).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => user.update("")).toThrow(
//                 new ValidationError("name is required")
//             );

//             expect(() => user.update(5 as any)).toThrow(
//                 new ValidationError("name must be a string")
//             );

//             expect(() => user.update("t".repeat(256))).toThrow(
//                 new ValidationError("name cannot be longer than 255 characters")
//             );

//             expect(() => user.update("tt")).toThrow(
//                 new ValidationError("name cannot be shorter than 3 characters")
//             );
//         });

//         it("should a valid user", () => {

//             expect.assertions(0);

//             const user = new User({ name: "carinhoso" });
//             user.update("Agitado");
//         });
//     });
// });
