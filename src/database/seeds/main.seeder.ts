import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import UserSeeder from './user.seeder';
import CitySeeder from './city.seeder';
import StateSeeder from './state.seeder';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, StateSeeder);
    await runSeeder(dataSource, CitySeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
