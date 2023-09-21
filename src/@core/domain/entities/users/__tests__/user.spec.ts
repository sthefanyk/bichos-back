import UUID from '../../../../shared/domain/value-objects/uuid.vo';
import User from '../../users/user';
import UserProps from '../../users/user-props';

class StubUser extends User{}

describe('Test Entity User', () => {
  test('create entity user', async () => {
  //   const state = new State({ name: 'state', abbr:'ST' });

  //   const entity = new StubUser({
  //     fullName: 'name user',
  //     username: 'username',
  //     email: 'email@example.com',
  //     password: 'Password1',
  //     role: 0,
  //     city: 'city',
  //   });

  //   console.log(entity);

  //   expect(entity.get('fullName')).toBe('name user');
  //   expect(entity.get('email')).toBe('email@example.com');
  //   expect(entity.get('role')).toBe(0);
  //   expect(entity.get('id')).not.toBeNull();
  //   expect(entity.get('id')).toBeInstanceOf(UUID);
  //   expect(entity.get('created_at')).not.toBeNull();
  //   expect(entity.get('created_at')).toBeInstanceOf(Date);
  //   expect(entity.get('updated_at')).toBeNull();
  //   expect(entity.get('deleted_at')).toBeNull();
  // });

  // test('create user with full props', () => {
  //   const created_at = new Date();
  //   const updated_at = new Date('2023-09-14');
  //   const deleted_at = new Date('2023-09-16');

  //   const state = new State({ name: 'state', abbr:'ST' });

  //   const entity = new User({
  //     fullName: 'name user',
  //     username: 'username',
  //     email: 'email@example.com',
  //     password: 'Password1',
  //     role: 0,
  //     city: new City({ name: 'city', state}),
  //     state,
  //     description: 'description description description description',
  //     id: 'bd2c0d5e-2f3d-4645-b0cd-01638b466e92',
  //     created_at,
  //     updated_at,
  //     deleted_at,
  //   });

  //   const props = entity.getProps();
  //   expect(props.fullName).toBe('name user');
  //   expect(props.email).toBe('email@example.com');
  //   expect(props.password).toBe('Password1');
  //   expect(props.role).toBe(0);
  //   expect(props.id.getUuid()).toBe('bd2c0d5e-2f3d-4645-b0cd-01638b466e92');
  //   expect(props.created_at).toBe(created_at);
  //   expect(props.updated_at).toBe(updated_at);
  //   expect(props.deleted_at).toBe(deleted_at);
  // });

  // test('toJson entity user', () => {
  //   const entity = new User({
  //     fullName: 'user name',
  //     email: 'email@example.com',
  //     password: 'Password1',
  //     role: 2,
  //     city 'city',

  //   });

  //   expect(entity.toJson()).toStrictEqual({
  //     id: entity.get('id').value,
  //     created_at: entity.get('created_at'),
  //     updated_at: null,
  //     deleted_at: null,
  //     name: 'user name',
  //     email: 'email@example.com',
  //     password: 'Password1',
  //     role: 2,
  //   });
  // });

  // test('update entity user', () => {
  //   const userProps = new UserProps(
  //     'user name',
  //     'email@example.com',
  //     'Password1',
  //     3
  //   );
  //   const entity = new User(userProps);

  //   entity.update(
  //     'user name',
  //     'email@example.com',
  //     'Password1',
  //   );

  //   expect(entity.get('name')).toBe('user name');
  //   expect(entity.get('email')).toBe('email@example.com');
  //   expect(entity.get('password')).toBe('Password1');
  //   expect(entity.get('role')).toBe(3);
  //   expect(entity.get('id')).not.toBeNull();
  //   expect(entity.get('id')).toBeInstanceOf(UUID);
  //   expect(entity.get('created_at')).not.toBeNull();
  //   expect(entity.get('created_at')).toBeInstanceOf(Date);
  //   expect(entity.get('updated_at')).not.toBeNull();
  //   expect(entity.get('updated_at')).toBeInstanceOf(Date);
  //   expect(entity.get('deleted_at')).toBeNull();
  });
});
