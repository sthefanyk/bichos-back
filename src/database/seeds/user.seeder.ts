import * as bcrypt from 'bcrypt';
import { CityModel } from 'src/@core/domain/models/city.model';
import { UserModel } from 'src/@core/domain/models';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const cityRepo = dataSource.getRepository(CityModel);
    const userRepo = dataSource.getRepository(UserModel);

    const city = await cityRepo.findOneBy({ name: 'PARANAGUÁ' });

    const dataUser = {
      id: '9c0be5d4-a47c-427c-8234-54c45e482448',
      full_name: 'admin',
      username: 'admin',
      city: city,
      email: 'admin@admin.com',
      password: await bcrypt.hash('Admin12345', 10),
      role: Role.ADMIN,
      created_at: new Date()
    };

    const user = await userRepo.findOneBy({ username: dataUser.username });
    if (!user) await userRepo.insert([dataUser]);
  }
}
