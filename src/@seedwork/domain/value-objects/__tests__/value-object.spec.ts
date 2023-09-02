import ValueObject from "../value-objects";


class StubValueObject extends ValueObject {
    
}

describe("ValueObject Unit Tests", () => {
    it("Should be able to create a new ValueObject", () => {
        let valueObject = new StubValueObject('string value');
        expect(valueObject).toBeDefined();
        expect(valueObject.value).toBe('string value');
        
        valueObject = new StubValueObject({prop: 'value'});
        expect(valueObject.value).toStrictEqual({prop: 'value'});
        
    });

    it('should convert value to string', () => {

        const date = new Date();

        let arrange = [
            // { received: null, expected: "null" },
            // { received: undefined, expected: "undefined" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: 0, expected: "0" },
            { received: 1.1, expected: "1.1" },
            { received: "string", expected: "string" },
            { received: "", expected: "" },
            { received: ['a'], expected: "a" },
            { received: ['a', 'b', 1], expected: "a,b,1" },
            { received: {}, expected: "{}" },
            { received: date, expected: date.toString() },
            { received: { prop: "value" }, expected: JSON.stringify({ prop: "value"}) },

        ];

        arrange.forEach(value => {
            const valueObject = new StubValueObject(value.received);
            expect(valueObject.toString()).toBe(value.expected);
            expect(valueObject + "").toBe(value.expected);
        });
    })

    it("should be a immutable object", () => {
        const obj = {
            prop1: "prop1",
            deep: { prop2: "prop2", prop3: new Date() },
        };

        const valueObject = new StubValueObject(obj);

        expect(() => {
            (valueObject as any).value.prop1 = "test";
        }).toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );

        expect(() => {
            (valueObject as any).value.deep.prop2 = "test";
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
    });
});