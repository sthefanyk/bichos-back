import { Injectable, Inject } from '@nestjs/common';
import {
  PersonCreate,
  PersonInactivate,
  PersonFindAll,
  PersonFindById,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
  PersonSearch,
  PersonUpdate,
} from 'src/@core/application/use-cases/person';
import { PersonCollectionPresenter } from './person.presenter';
import { PersonActivate } from 'src/@core/application/use-cases/person/activate.usecase';

@Injectable()
export class PersonService {
  @Inject(PersonCreate.Usecase)
  private createUseCase: PersonCreate.Usecase;

  @Inject(PersonFindAll.Usecase)
  private listUseCase: PersonFindAll.Usecase;

  @Inject(PersonGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: PersonGetActiveRecords.Usecase;

  @Inject(PersonGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: PersonGetInactiveRecords.Usecase;

  @Inject(PersonSearch.Usecase)
  private searchUseCase: PersonSearch.Usecase;

  @Inject(PersonFindById.Usecase)
  private getUseCase: PersonFindById.Usecase;

  @Inject(PersonUpdate.Usecase)
  private updateUseCase: PersonUpdate.Usecase;

  @Inject(PersonInactivate.Usecase)
  private inactivateUseCase: PersonInactivate.Usecase;

  @Inject(PersonActivate.Usecase)
  private activateUseCase: PersonActivate.Usecase;

  async create(data: PersonCreate.Input) {
    return this.createUseCase.execute(data);
  }

  async search(searchParams: PersonSearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new PersonCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: PersonSearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new PersonCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: PersonSearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new PersonCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async update(id: string, data: PersonUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
