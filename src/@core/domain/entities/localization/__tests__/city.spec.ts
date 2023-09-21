import { City } from "../city";
import { State } from "../state";

describe("City Tests", () => {
    test("create", () => {
        const state = new State({
            name: 'paraná',
            abbreviation: 'PR'
        });

        const city = new City({
            name: 'paranaguá',
            state: state
        });

        const props = city.getProps();

        expect(props.name).toBe('paranaguá');
        expect(props.state.get('name')).toBe('paraná');
    });
});