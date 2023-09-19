import { Role } from "../../../../shared/domain/enums/role.enum";
import PersonProps from "../person-props";

describe("PersonProps Tests", () => {
    test("Create PersonProps without all parameters.", () => {
        const date = new Date('2002-02-27');
        const personProps = new PersonProps(
            "12312312312",
            date,
            "name person",
            "email@example.com",
            "Password123"            
        );

        expect(personProps.cpf).toBe("12312312312");
        expect(personProps.date_birth).toBe(date);
        expect(personProps.date_birth).toBeInstanceOf(Date);
        expect(personProps.fullName).toBe("name person");
        expect(personProps.email).toBe("email@example.com");

        expect(personProps.role).toBe(Role.PERSON);
        expect(personProps.id).not.toBeNull();
        expect(personProps.created_at).not.toBeNull();
        expect(personProps.updated_at).toBeNull();
        expect(personProps.deleted_at).toBeNull();
    });

    test("Create PersonProps with all parameters.", () => {
        const date = new Date('2002-02-27');

        const created_at = new Date();
        const updated_at = new Date('2023-09-14');
        const deleted_at = new Date('2023-09-16');
        const personProps = new PersonProps(
            "12312312312",
            date,
            "name person",
            "email@example.com",
            "Password123",
            "bd2c0d5e-2f3d-4645-b0cd-01638b466e92",
            created_at,
            updated_at,
            deleted_at, 
        );

        expect(personProps.cpf).toBe("12312312312");
        expect(personProps.date_birth).toBe(date);
        expect(personProps.date_birth).toBeInstanceOf(Date);
        expect(personProps.name).toBe("name person");
        expect(personProps.email).toBe("email@example.com");
        
        expect(personProps.role).toBe(Role.PERSON);
        expect(personProps.id.toString()).toBe("bd2c0d5e-2f3d-4645-b0cd-01638b466e92");
        expect(personProps.created_at).toBe(created_at);
        expect(personProps.updated_at).toBe(updated_at);
        expect(personProps.deleted_at).toBe(deleted_at);
    });
});