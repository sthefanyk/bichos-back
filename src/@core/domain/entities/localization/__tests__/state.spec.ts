import { State } from '../state';

describe('State Tests', () => {
  test('create', () => {
    const state = new State({
      name: 'paraná',
      abbreviation: 'PR',
    });

    const props = state.getProps();

    expect(props.name).toBe('paraná');
    expect(props.abbreviation).toBe('PR');
  });
});
