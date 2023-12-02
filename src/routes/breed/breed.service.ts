import { Injectable, Inject } from '@nestjs/common';
import {
  BreedCreate,
  BreedFindById,
  BreedUpdate,
  BreedSearch,
  BreedActivate,
  BreedInactivate,
  BreedGetActiveRecords,
  BreedGetInactiveRecords,
  BreedFindBySpecie,
} from 'src/@core/application/use-cases/breed';
import { BreedCollectionPresenter } from './breed.presenter';

@Injectable()
export class BreedService {
  @Inject(BreedCreate.Usecase)
  private createUseCase: BreedCreate.Usecase;

  @Inject(BreedGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: BreedGetActiveRecords.Usecase;

  @Inject(BreedGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: BreedGetInactiveRecords.Usecase;

  @Inject(BreedSearch.Usecase)
  private searchUseCase: BreedSearch.Usecase;

  @Inject(BreedFindById.Usecase)
  private getUseCase: BreedFindById.Usecase;

  @Inject(BreedFindBySpecie.Usecase)
  private findBySpecieUseCase: BreedFindBySpecie.Usecase;

  @Inject(BreedUpdate.Usecase)
  private updateUseCase: BreedUpdate.Usecase;

  @Inject(BreedInactivate.Usecase)
  private inactivateUseCase: BreedInactivate.Usecase;

  @Inject(BreedActivate.Usecase)
  private activateUseCase: BreedActivate.Usecase;

  async create(data: BreedCreate.Input) {
    return this.createUseCase.execute(data);
  }

  async search(searchParams: BreedSearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new BreedCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: BreedSearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new BreedCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: BreedSearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new BreedCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async findBySpecie(searchParams: BreedSearch.Input, specie: string) {
    const output = await this.findBySpecieUseCase.execute({
      search: searchParams,
      specie,
    });

    return new BreedCollectionPresenter(output);
  }

  async update(id: string, data: BreedUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
