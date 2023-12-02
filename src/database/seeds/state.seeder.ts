import { StateModel } from '../../@core/domain/models/state.model';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class StateSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const stateRepo = dataSource.getRepository(StateModel);

    const states = [
      { name: 'ACRE', abbreviation: 'AC' },
      { name: 'ALAGOAS', abbreviation: 'AL' },
      { name: 'AMAPÁ', abbreviation: 'AP' },
      { name: 'AMAZONAS', abbreviation: 'AM' },
      { name: 'BAHIA', abbreviation: 'BA' },
      { name: 'CEARÁ', abbreviation: 'CE' },
      { name: 'DISTRITO FEDERAL', abbreviation: 'DF' },
      { name: 'ESPÍRITO SANTO', abbreviation: 'ES' },
      { name: 'GOIÁS', abbreviation: 'GO' },
      { name: 'MARANHÃO', abbreviation: 'MA' },
      { name: 'MATO GROSSO', abbreviation: 'MT' },
      { name: 'MATO GROSSO DO SUL', abbreviation: 'MS' },
      { name: 'MINAS GERAIS', abbreviation: 'MG' },
      { name: 'PARÁ', abbreviation: 'PA' },
      { name: 'PARAÍBA', abbreviation: 'PB' },
      { name: 'PARANÁ', abbreviation: 'PR' },
      { name: 'PERNAMBUCO', abbreviation: 'PE' },
      { name: 'PIAUÍ', abbreviation: 'PI' },
      { name: 'RIO DE JANEIRO', abbreviation: 'RJ' },
      { name: 'RIO GRANDE DO NORTE', abbreviation: 'RN' },
      { name: 'RIO GRANDE DO SUL', abbreviation: 'RS' },
      { name: 'RONDÔNIA', abbreviation: 'RO' },
      { name: 'RORAIMA', abbreviation: 'RR' },
      { name: 'SANTA CATARINA', abbreviation: 'SC' },
      { name: 'SÃO PAULO', abbreviation: 'SP' },
      { name: 'SERGIPE', abbreviation: 'SE' },
      { name: 'TOCANTINS', abbreviation: 'TO' },
    ];

    states.forEach(async (state) => {
      if (!(await stateRepo.findOneBy({ name: state.name }))) {
        await stateRepo.insert([state]);
      }
    });
  }
}
