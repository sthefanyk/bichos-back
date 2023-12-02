import { DataSource } from 'typeorm';
import { PersonTypeormRepository } from '../person-typeorm.repository';
import { City } from '../../../../domain/entities/localization/city';
import Person from '../../../../domain/entities/users/person';
import { State } from '../../../../domain/entities/localization/state';
import UserModel from '../../../../domain/models/user.model';
import PersonModel from '../../../../domain/models/person.model';
import { PersonSearch } from '../../../../application/use-cases/person';

describe('Testes', () => {
  test('aaaa', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'src/database/a.sqlite',
      synchronize: true,
      logging: false,
      entities: [UserModel, PersonModel],
    });

    await dataSource.initialize();

    const repo = new PersonTypeormRepository(dataSource);

    const city = new City({
      name: 'city',
      state: new State({ name: 'state', abbreviation: 'ST' }),
    });

    const entity = new Person(
      {
        cpf: '12312312311',
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

    // await repo.insert(entity);
    // await repo.findAll()
    // const result = await dataSource.query(`
    //     SELECT * FROM person
    //     INNER JOIN user ON person.id = user.id
    // `);

    // console.log(result);
    const usecase = new PersonSearch.Usecase(repo);
    console.log(await usecase.execute());
    // console.log(await repo.findAll());
  });
});
