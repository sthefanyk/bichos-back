import UUID from '../../../../shared/domain/value-objects/uuid.vo';
import { City } from '../../localization/city';
import { State } from '../../localization/state';
import Person from '../person';

describe('Test Entity Person', () => {
  test('create entity user', async () => {
    const city = new City({
      name: 'city',
      state: new State({ name: 'state', abbreviation: 'ST' }),
    });

    const entity = new Person(
      {
        cpf: '00000000000',
        date_birth: new Date('2002-02-27'),
      },
      {
        fullName: 'name user',
        username: 'username',
        email: 'email@example.com',
        password: 'Password1',
        role: 0,
        city,
      },
    );

    console.log(entity);
    expect(entity.cpf).toBe('00000000000');
    expect(entity.date_birth).toStrictEqual(new Date('2002-02-27'));
    expect(entity.get('fullName')).toBe('name user');
    expect(entity.get('email')).toBe('email@example.com');
    expect(entity.get('role')).toBe(0);
    expect(entity.get('id')).not.toBeNull();
    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(entity.get('created_at')).not.toBeNull();
    expect(entity.get('created_at')).toBeInstanceOf(Date);
    expect(entity.get('updated_at')).toBeNull();
    expect(entity.get('deleted_at')).toBeNull();
  });
});
