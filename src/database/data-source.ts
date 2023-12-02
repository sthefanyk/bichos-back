import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from './seeds/main.seeder';

// SQLITE

// export const dataSourceOptions: DataSourceOptions & SeederOptions = {
//   type: 'sqlite',
//   database: 'src/database/db.sqlite',
//   logging: false,
//   synchronize: true,
//   entities: [`${__dirname}/../**/models/**/*.{ts,js}`],
//   migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
//   seeds: [MainSeeder],
// };

// MYSQL

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/models/**/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  seeds: [MainSeeder],
  synchronize: process.env.ENV === "dev",
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
