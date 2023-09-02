import { omit } from "lodash";
import { Personality, PersonalityProps } from "./personality";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Personality Unit Tests", () => {
    test("Constructor of personality", () => {

        let personality;

        // -----------------------------------------

        personality = new Personality({ name: "Agitado" });
        let props = omit(personality.props, "created_at");

        expect(props).toStrictEqual({
            name: "Agitado",
            is_active: true,
        });
        expect(personality.props.created_at).toBeInstanceOf(Date);

        // -----------------------------------------

        const created_at = new Date();

        personality = new Personality({name: "Agitado", is_active: false, created_at});

        expect(personality.props).toStrictEqual({
            name: "Agitado",
            is_active: false,
            created_at
        });

        // -----------------------------------------

        personality = new Personality({name: "Agitado"});

        expect(personality.created_at).toBeInstanceOf(Date);
        expect(personality.is_active).toBeTruthy;

    });

    test("Id field", () => {

        type PersonalityData = {props: PersonalityProps, id?: UniqueEntityId}

        const data: PersonalityData[] = [
            {props: {name: "Carinhoso"}},
            {props: {name: "Carinhoso"}, id: null},
            {props: {name: "Carinhoso"}, id: undefined},
            {props: {name: "Carinhoso"}, id: new UniqueEntityId()},
            {props: {name: "Carinhoso"}, id: new UniqueEntityId('efa14e35-19ba-4af1-9173-5f52a67d41d3')},
        ];

        data.forEach(i => {
            const personality = new Personality(i.props, i.id);
            expect(personality.id).not.toBeNull();
            expect(personality.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        });
    });

    test("update name personality", () => {

        const personality = new Personality({name: "Carinhoso"});
        personality["name"] = "other personality";

        expect(personality.name).toBe("other personality");
    });

    it("should active a personality", () => {

        const personality = new Personality({name: "Agitado", is_active: false});

        personality.activate();

        expect(personality.is_active).toBeTruthy();
    });

    it("should deactive a personality", () => {

        const personality = new Personality({name: "Agitado", is_active: true});

        personality.deactivate();

        expect(personality.is_active).not.toBeTruthy();
    });
});
