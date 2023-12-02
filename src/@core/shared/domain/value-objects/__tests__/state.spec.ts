import State from '../state.vo';

describe('Test Value Object State', () => {
  it('should accept a state passed in constructor', () => {
    const stateName = 'Paraná';
    const stateAbbr = 'PR';
    const vo = new State({ name: stateName, abbr: stateAbbr });

    expect(vo.value.name).toBe(stateName);
    expect(vo.value.abbr).toBe(stateAbbr);
  });
});
