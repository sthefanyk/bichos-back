import { Injectable, Inject } from '@nestjs/common';
import { PersonCreate, PersonDelete, PersonFindAll, PersonFindById, PersonGetActiveRecords, PersonGetInactiveRecords, PersonSearch, PersonUpdate } from 'src/@core/application/use-cases/person';
import { PersonOutputDto } from 'src/@core/application/DTOs/person.dto';
import { PersonCollectionPresenter, PersonPresenter } from './person.presenter';
import { State } from 'src/@core/domain/entities/localization/state';
import { City } from 'src/@core/domain/entities/localization/city';

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

  @Inject(PersonDelete.Usecase)
  private deleteUseCase: PersonDelete.Usecase;

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

  async findAll() {
    // const output = await this.searchUseCase.execute(searchParams);
    // return new PersonCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output
    // return PersonService.personToResponse(PersonMapper.getModel(output) as any);
  }

  async update(id: string, data: PersonUpdate.Input) {
    data.date_birth = new Date(data.date_birth);
    data.city = new City({ name: "city", state: new State({ name: "state", abbreviation: "ST" })  });
    await this.updateUseCase.execute({ id, ...data });
  }

  async remove(id: string) {
    await this.deleteUseCase.execute({ id });
  }

  static personToResponse(output: PersonOutputDto) {
    return new PersonPresenter(output);
  }
}
