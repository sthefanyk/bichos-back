import ValueObject from "./value-objects";

export default class State extends ValueObject<{ name: string, abbr: string}> {
    constructor(
        private readonly state: { name: string, abbr: string}
    ){
        super(state);
    }
}