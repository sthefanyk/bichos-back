import { omit } from 'lodash';
import { User, UserProps } from '../user';
import UniqueEntityId from '../../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe('User Unit Tests', () => {
  beforeEach(() => {
    User.validate = jest.fn();
  });
  test('Constructor of user', () => {
    let user;

    // -----------------------------------------

    user = new User({ name: 'name', email: 'email@example.com', password: 'Password1' });
    const props = omit(user.props, 'created_at');

    expect(User.validate).toHaveBeenCalled();

    expect(props).toStrictEqual({
      name: 'name',
      email: 'email@example.com',
      password: 'Password1',
      is_active: true,
    });
    expect(user.props.created_at).toBeInstanceOf(Date);

    // -----------------------------------------

    const created_at = new Date();

    user = new User({
      name: 'name',
      email: 'email@example.com',
      password: 'Password1',
      is_active: false,
      created_at,
    });

    expect(user.props).toStrictEqual({
      name: 'name',
      email: 'email@example.com',
      password: 'Password1',
      is_active: false,
      created_at,
    });

    // -----------------------------------------

    user = new User({ name: 'name', email: 'email@example.com', password: 'Password1' });

    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.is_active).toBeTruthy;
  });

  test('Id field', () => {
    type UserData = { props: UserProps; id?: UniqueEntityId };

    const data: UserData[] = [
      { props: { name: 'name', email: 'email@example.com', password: 'Password1' } },
      { props: { name: 'name', email: 'email@example.com', password: 'Password1' }, id: null },
      { props: { name: 'name', email: 'email@example.com', password: 'Password1' }, id: undefined },
      { props: { name: 'name', email: 'email@example.com', password: 'Password1' }, id: new UniqueEntityId() },
      {
        props: { name: 'name', email: 'email@example.com', password: 'Password1' },
        id: new UniqueEntityId('efa14e35-19ba-4af1-9173-5f52a67d41d3'),
      },
    ];

    data.forEach((i) => {
      const user = new User(i.props, i.id);
      expect(user.id).not.toBeNull();
      expect(user.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test('update user', () => {
    const user = new User({ name: 'name', email: 'email@example.com', password: 'Password1' });
    user.update('other name', 'otheremail@example.com', 'otherPassword1');

    expect(User.validate).toHaveBeenCalledTimes(2);

    expect(user.name).toBe('other name');
    expect(user.email).toBe('otheremail@example.com');
    expect(user.password).toBe('otherPassword1');
  });

  it('should active a user', () => {
    const user = new User({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: false });

    user.activate();

    expect(user.is_active).toBeTruthy();
  });

  it('should deactivate a user', () => {
    const user = new User({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: true });

    user.deactivate();

    expect(user.is_active).not.toBeTruthy();
  });
});
