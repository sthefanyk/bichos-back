import { Injectable, Inject } from '@nestjs/common';
import {
  ShelterCreate,
  ShelterInactivate,
  ShelterFindAll,
  ShelterFindById,
  ShelterGetActiveRecords,
  ShelterGetInactiveRecords,
  ShelterSearch,
  ShelterUpdate,
  ShelterActivate
} from 'src/@core/application/use-cases/shelter';
import { ShelterCollectionPresenter } from './shelter.presenter';
import { AuthService as Service } from 'src/@core/application/services/auth/auth.service';

@Injectable()
export class ShelterService {
  @Inject(ShelterCreate.Usecase)
  private createUseCase: ShelterCreate.Usecase;

  @Inject(ShelterFindAll.Usecase)
  private listUseCase: ShelterFindAll.Usecase;

  @Inject(ShelterGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: ShelterGetActiveRecords.Usecase;

  @Inject(ShelterGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: ShelterGetInactiveRecords.Usecase;

  @Inject(ShelterSearch.Usecase)
  private searchUseCase: ShelterSearch.Usecase;

  @Inject(ShelterFindById.Usecase)
  private getUseCase: ShelterFindById.Usecase;

  @Inject(ShelterUpdate.Usecase)
  private updateUseCase: ShelterUpdate.Usecase;

  @Inject(ShelterInactivate.Usecase)
  private inactivateUseCase: ShelterInactivate.Usecase;

  @Inject(ShelterActivate.Usecase)
  private activateUseCase: ShelterActivate.Usecase;

  @Inject(Service)
  private service: Service;

  async create(data: ShelterCreate.Input) {
    const {id} = await this.createUseCase.execute(data);

    if (id) return this.service.singIn(data.email, data.password);
    
    return null;
  }

  async search(searchParams: ShelterSearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new ShelterCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: ShelterSearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new ShelterCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: ShelterSearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new ShelterCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async update(id: string, data: ShelterUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
