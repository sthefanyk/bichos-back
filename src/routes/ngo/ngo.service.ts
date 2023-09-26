import { Injectable, Inject } from '@nestjs/common';
import { NGOCreate, NGOInactivate, NGOFindAll, NGOFindById, NGOGetActiveRecords, NGOGetInactiveRecords, NGOSearch, NGOUpdate } from 'src/@core/application/use-cases/ngo';
import { NGOOutputDto } from 'src/@core/application/DTOs/ngo.dto';
import { NGOCollectionPresenter, NGOPresenter } from './ngo.presenter';
import { NGOMapper } from 'src/@core/domain/mappers/ngo.mapper';
import { NGOActivate } from 'src/@core/application/use-cases/ngo/activate.usecase';

@Injectable()
export class NGOService {
  @Inject(NGOCreate.Usecase)
  private createUseCase: NGOCreate.Usecase;

  @Inject(NGOFindAll.Usecase)
  private listUseCase: NGOFindAll.Usecase;

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

  async create(data: NGOCreate.Input) {
    return this.createUseCase.execute(data);
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

  async findAll() {
    // const output = await this.searchUseCase.execute(searchParams);
    // return new NGOCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return NGOMapper.getJsonWithEntity(output);
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

  static ngoToResponse(output: NGOOutputDto) {
    return new NGOPresenter(output);
  }
}
