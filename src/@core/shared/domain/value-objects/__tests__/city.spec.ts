import City from '../city.vo';
import State from '../state.vo';

describe('Test Value Object State', () => {
  it('should accept a state passed in constructor', () => {
    const cityName = 'Paranaguá';
    const stateName = 'Paraná';
    const stateAbbr = 'PR';

    const state = new State({ name: stateName, abbr: stateAbbr });
    const vo = new City({ name: cityName, state });

    expect(vo.value.name).toBe(cityName);
    expect(vo.value.state.value.name).toBe(stateName);
    expect(vo.value.state.value.abbr).toBe(stateAbbr);
  });
});
