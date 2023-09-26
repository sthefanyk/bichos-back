import * as bcrypt from 'bcrypt';
import { CityModel } from 'src/@core/domain/models/city.model';
import UserModel from 'src/@core/domain/models/user.model';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const cityRepo = dataSource.getRepository(CityModel);
    const userRepo = dataSource.getRepository(UserModel);

    const city = await cityRepo.findOneBy({ name: 'PARANAGUÁ' });

    const dataUser = {
      id: '0',
      full_name: 'admin',
      username: process.env.ADMIN_USERNAME,
      city: city,
      email: process.env.ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      role: Role.ADMIN,
      created_at: new Date()
    };

    const user = await userRepo.findOneBy({ username: dataUser.username });
    if (!user) await userRepo.insert([dataUser]);
  }
}
