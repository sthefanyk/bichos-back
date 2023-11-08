import { Injectable, Inject } from '@nestjs/common';
import {
  NeedCreate,
  NeedFindById,
  NeedUpdate,
  NeedSearch,
  NeedActivate,
  NeedInactivate,
  NeedGetActiveRecords,
  NeedGetInactiveRecords
} from 'src/@core/application/use-cases/need';
import { NeedCollectionPresenter } from './need.presenter';

@Injectable()
export class NeedService {
  @Inject(NeedCreate.Usecase)
  private createUseCase: NeedCreate.Usecase;

  @Inject(NeedGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: NeedGetActiveRecords.Usecase;

  @Inject(NeedGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: NeedGetInactiveRecords.Usecase;

  @Inject(NeedSearch.Usecase)
  private searchUseCase: NeedSearch.Usecase;

  @Inject(NeedFindById.Usecase)
  private getUseCase: NeedFindById.Usecase;

  @Inject(NeedUpdate.Usecase)
  private updateUseCase: NeedUpdate.Usecase;

  @Inject(NeedInactivate.Usecase)
  private inactivateUseCase: NeedInactivate.Usecase;

  @Inject(NeedActivate.Usecase)
  private activateUseCase: NeedActivate.Usecase;

  async create(data: NeedCreate.Input) {
    return this.createUseCase.execute(data);
  }

  async search(searchParams: NeedSearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new NeedCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: NeedSearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new NeedCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: NeedSearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new NeedCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async update(id: string, data: NeedUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
