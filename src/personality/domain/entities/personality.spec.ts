import { Personality } from "./personality";

describe("Personality Tests", () => {
    test('constructor of personality', () => {
        const personality = new Personality('Agitado');
        expect(personality.name).toBe('Agitado');
    })
});