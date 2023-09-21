import { Injectable, Inject } from '@nestjs/common';
import { StateGetByName } from 'src/@core/application/use-cases/localization/get-state-by-name.usecase';
import { CityInsert } from 'src/@core/application/use-cases/localization/insert-city.usecase';
import { StateInsert } from 'src/@core/application/use-cases/localization/insert-state.usecase';

@Injectable()
export class LocalizationService {
  @Inject(StateInsert.Usecase)
  private insertStateUseCase: StateInsert.Usecase;

  @Inject(StateGetByName.Usecase)
  private getStateByNameUseCase: StateGetByName.Usecase;

  @Inject(CityInsert.Usecase)
  private cityInsertUseCase: CityInsert.Usecase;

  async insertState(data: StateInsert.Input) {
    return await this.insertStateUseCase.execute(data);
  }

  async getStateByName(name: string) {
    return await this.getStateByNameUseCase.execute({ name });
  }

  async insertCity(data: CityInsert.Input) {
    return await this.cityInsertUseCase.execute(data);
  }

  findAll() {
    return `This action returns all localization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localization`;
  }

  update(id: number, data) {
    return `This action updates a #${id} localization`;
  }

  remove(id: number) {
    return `This action removes a #${id} localization`;
  }
}
