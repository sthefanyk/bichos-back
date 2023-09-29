import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from './seeds/main.seeder';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'src/database/db.sqlite',
  logging: false,
  synchronize: true,
  entities: [`${__dirname}/../**/models/**/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
