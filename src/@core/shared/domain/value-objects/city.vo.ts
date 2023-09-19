import State from "./state.vo";
import ValueObject from "./value-objects";

export default class City extends ValueObject<{ name: string, state: State }> {
    constructor(
        private readonly city: { name: string, state: State },
    ){
        super(city);
    }
}