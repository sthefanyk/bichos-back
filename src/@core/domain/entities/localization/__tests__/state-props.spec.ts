import { StateProps } from '../state-props';

describe('StateProps Tests', () => {
  test('create', () => {
    const props = new StateProps({
      name: 'test',
      abbreviation: 'TS',
    });

    expect(props.name).toBe('test');
    expect(props.abbreviation).toBe('TS');
  });
});
