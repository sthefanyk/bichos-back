import 'reflect-metadata';
import UserModel from '../@core/domain/models/user.model';
import { DataSource } from 'typeorm';
import PersonalityModel from '../@core/domain/models/personality.model';

export class TypeORM {
  static async DataSource<M>(model: new () => M){
    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'src/database/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [UserModel],
      migrations: ['src/database/migration/*.ts'],
      subscribers: [],
    });

    await dataSource.initialize();
    return dataSource.getRepository(model);
  }
}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/my.sqlite',
  synchronize: true,
  logging: true,
  entities: [UserModel, PersonalityModel],
  migrations: ['src/database/migrations/*.{ts,js}'],
});
