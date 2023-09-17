import UUID from '../../../shared/domain/value-objects/uuid.vo';
import User from '../user';
import UserProps from '../user-props';

describe('Test Entity User', () => {
  test('create entity user', () => {
    const userProps = new UserProps(
      'user name',
      'email@example.com',
      'Password1',
    );
    const entity = new User(userProps);

    expect(entity.get('name')).toBe('user name');
    expect(entity.get('email')).toBe('email@example.com');
    expect(entity.get('password')).toBe('Password1');
    expect(entity.get('id')).not.toBeNull();
    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(entity.get('created_at')).not.toBeNull();
    expect(entity.get('created_at')).toBeInstanceOf(Date);
    expect(entity.get('updated_at')).toBeNull();
    expect(entity.get('deleted_at')).toBeNull();
  });

  test('create entity user', () => {
    const created_at = new Date();
    const updated_at = new Date('2023-09-14');
    const deleted_at = new Date('2023-09-16');

    const userProps = new UserProps(
      'user name',
      'email@example.com',
      'Password1',
      'bd2c0d5e-2f3d-4645-b0cd-01638b466e92',
      created_at,
      updated_at,
      deleted_at,
    );

    const entity = new User(userProps);

    const props = entity.getProps();
    expect(props.name).toBe('user name');
    expect(props.email).toBe('email@example.com');
    expect(props.password).toBe('Password1');
    expect(props.id.getUuid()).toBe('bd2c0d5e-2f3d-4645-b0cd-01638b466e92');
    expect(props.created_at).toBe(created_at);
    expect(props.updated_at).toBe(updated_at);
    expect(props.deleted_at).toBe(deleted_at);
  });

  test('toJson entity user', () => {
    const userProps = new UserProps(
      'user name',
      'email@example.com',
      'Password1',
    );
    const entity = new User(userProps);

    expect(entity.toJson()).toStrictEqual({
      id: entity.get('id').value,
      created_at: entity.get('created_at'),
      updated_at: null,
      deleted_at: null,
      name: 'user name',
      email: 'email@example.com',
      password: 'Password1',
    });
  });

  test('update entity user', () => {
    const userProps = new UserProps(
      'user name',
      'email@example.com',
      'Password1',
    );
    const entity = new User(userProps);

    entity.update(
      'user name',
      'email@example.com',
      'Password1',
    );

    expect(entity.get('name')).toBe('user name');
    expect(entity.get('email')).toBe('email@example.com');
    expect(entity.get('password')).toBe('Password1');
    expect(entity.get('id')).not.toBeNull();
    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(entity.get('created_at')).not.toBeNull();
    expect(entity.get('created_at')).toBeInstanceOf(Date);
    expect(entity.get('updated_at')).not.toBeNull();
    expect(entity.get('updated_at')).toBeInstanceOf(Date);
    expect(entity.get('deleted_at')).toBeNull();
  });
});
