import UserProps from '../user-props';
import UUID from '../../../../shared/domain/value-objects/uuid.vo';
import { City } from '../../localization/city';
import { State } from '../../localization/state';

describe('Test UserProps', () => {
  test('Create userProps without params', () => {
    const city = new City({
      name: 'city',
      state: new State({ name: 'state', abbreviation: 'ST' }),
    });

    const props = new UserProps({
      fullName: 'name user',
      username: 'username',
      email: 'email@example.com',
      password: 'Password1',
      role: 0,
      city,
    });

    expect(props.fullName).toBe('name user');
    expect(props.username).toBe('username');
    expect(props.email).toBe('email@example.com');
    expect(props.password).toBe('Password1');
    expect(props.role).toBe(0);

    expect(props.id).toBeInstanceOf(UUID);
    expect(props.id).not.toBeNull();
    expect(props.created_at).not.toBeNull();
    expect(props.updated_at).toBeNull();
    expect(props.deleted_at).toBeNull();
  });

  test('Create props with params', () => {
    const created_at = new Date();
    const updated_at = new Date('2023-09-14');
    const deleted_at = new Date('2023-09-16');
    const city = new City({
      name: 'city',
      state: new State({ name: 'state', abbreviation: 'ST' }),
    });

    const props = new UserProps({
      fullName: 'name user',
      email: 'email@example.com',
      password: 'Password1',
      role: 0,
      id: 'bd2c0d5e-2f3d-4645-b0cd-01638b466e92',
      created_at,
      updated_at,
      deleted_at,
      city,
      username: 'username',
      description: 'description',
    });

    expect(props.name).toBe('name user');
    expect(props.email).toBe('email@example.com');
    expect(props.password).toBe('Password1');

    expect(props.id.getUuid()).toBe('bd2c0d5e-2f3d-4645-b0cd-01638b466e92');
    expect(props.created_at).toBe(created_at);
    expect(props.updated_at).toBe(updated_at);
    expect(props.deleted_at).toBe(deleted_at);
  });
});
