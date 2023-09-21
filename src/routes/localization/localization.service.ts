import { Injectable, Inject } from '@nestjs/common';
import { CityDelete, CityInsert, GetCitiesByState, ListCities, ListStates, StateDelete, StateGetByName, StateInsert } from 'src/@core/application/use-cases/localization';

@Injectable()
export class LocalizationService {
  @Inject(StateInsert.Usecase)
  private insertStateUseCase: StateInsert.Usecase;

  @Inject(StateGetByName.Usecase)
  private getStateByNameUseCase: StateGetByName.Usecase;

  @Inject(CityInsert.Usecase)
  private cityInsertUseCase: CityInsert.Usecase;

  @Inject(GetCitiesByState.Usecase)
  private getCitiesByStateUseCase: GetCitiesByState.Usecase;

  @Inject(ListStates.Usecase)
  private listStatesUsecase: ListStates.Usecase;

  @Inject(ListCities.Usecase)
  private listCitiesUsecase: ListCities.Usecase;

  @Inject(CityDelete.Usecase)
  private deleteCityUseCase: CityDelete.Usecase;

  @Inject(StateDelete.Usecase)
  private deleteStateUseCase: StateDelete.Usecase;

  async insertState(data: StateInsert.Input) {
    return await this.insertStateUseCase.execute(data);
  }

  async getStateByName(name: string) {
    return await this.getStateByNameUseCase.execute({ name });
  }

  async insertCity(data: CityInsert.Input) {
    return await this.cityInsertUseCase.execute(data);
  }

  async getCitiesByState(state: string) {
    return await this.getCitiesByStateUseCase.execute({ state });
  }

  async listStates() {
    return await this.listStatesUsecase.execute();
  }

  async listCities() {
    return await this.listCitiesUsecase.execute();
  }

  async deleteCity(name: string) {
    return await this.deleteCityUseCase.execute({ name });
  }

  async deleteState(name: string) {
    return await this.deleteStateUseCase.execute({ name });
  }
}
