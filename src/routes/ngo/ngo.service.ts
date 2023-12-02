import { Injectable, Inject } from '@nestjs/common';
import {
  NGOCreate,
  NGOInactivate,
  NGOFindById,
  NGOGetActiveRecords,
  NGOGetInactiveRecords,
  NGOSearch,
  NGOUpdate,
} from 'src/@core/application/use-cases/ngo';
import { NGOCollectionPresenter } from './ngo.presenter';
import { NGOActivate } from 'src/@core/application/use-cases/ngo/activate.usecase';
import { AuthService as Service } from 'src/@core/application/services/auth/auth.service';

@Injectable()
export class NGOService {
  @Inject(NGOCreate.Usecase)
  private createUseCase: NGOCreate.Usecase;

  @Inject(NGOGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: NGOGetActiveRecords.Usecase;

  @Inject(NGOGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: NGOGetInactiveRecords.Usecase;

  @Inject(NGOSearch.Usecase)
  private searchUseCase: NGOSearch.Usecase;

  @Inject(NGOFindById.Usecase)
  private getUseCase: NGOFindById.Usecase;

  @Inject(NGOUpdate.Usecase)
  private updateUseCase: NGOUpdate.Usecase;

  @Inject(NGOInactivate.Usecase)
  private inactivateUseCase: NGOInactivate.Usecase;

  @Inject(NGOActivate.Usecase)
  private activateUseCase: NGOActivate.Usecase;

  @Inject(Service)
  private service: Service;

  async create(data: NGOCreate.Input) {
    const { id } = await this.createUseCase.execute(data);

    if (id) return this.service.singIn(data.email, data.password);

    return null;
  }

  async search(searchParams: NGOSearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new NGOCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: NGOSearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new NGOCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: NGOSearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new NGOCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async update(id: string, data: NGOUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
