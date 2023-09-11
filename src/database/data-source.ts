import 'reflect-metadata';
import { User } from 'src/core/user/infra/repository/typeorm/User';
import { DataSource } from 'typeorm';

export class TypeORM {
  static async DataSource<M>(model: new () => M){
    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'src/database/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [User],
      migrations: ['src/database/migration/*.ts'],
      subscribers: [],
    });

    await dataSource.initialize();
    return dataSource.getRepository(model);
  }
}
