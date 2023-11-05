import { Injectable, Inject } from '@nestjs/common';
import {
  PersonalityCreate,
  PersonalityFindById,
  PersonalityUpdate,
  PersonalitySearch,
  PersonalityActivate,
  PersonalityInactivate,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords
} from 'src/@core/application/use-cases/personality';
import { PersonalityCollectionPresenter } from './personality.presenter';

@Injectable()
export class PersonalityService {
  @Inject(PersonalityCreate.Usecase)
  private createUseCase: PersonalityCreate.Usecase;

  @Inject(PersonalityGetActiveRecords.Usecase)
  private getActiveRecordsUseCase: PersonalityGetActiveRecords.Usecase;

  @Inject(PersonalityGetInactiveRecords.Usecase)
  private getInactiveRecordsUseCase: PersonalityGetInactiveRecords.Usecase;

  @Inject(PersonalitySearch.Usecase)
  private searchUseCase: PersonalitySearch.Usecase;

  @Inject(PersonalityFindById.Usecase)
  private getUseCase: PersonalityFindById.Usecase;

  @Inject(PersonalityUpdate.Usecase)
  private updateUseCase: PersonalityUpdate.Usecase;

  @Inject(PersonalityInactivate.Usecase)
  private inactivateUseCase: PersonalityInactivate.Usecase;

  @Inject(PersonalityActivate.Usecase)
  private activateUseCase: PersonalityActivate.Usecase;

  async create(data: PersonalityCreate.Input) {
    return this.createUseCase.execute(data);
  }

  async search(searchParams: PersonalitySearch.Input) {
    const output = await this.searchUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: PersonalitySearch.Input) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: PersonalitySearch.Input) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output.toJson();
  }

  async update(id: string, data: PersonalityUpdate.Input) {
    return this.updateUseCase.execute({ id, ...data });
  }

  async inactivate(id: string) {
    await this.inactivateUseCase.execute({ id });
  }

  async activate(id: string) {
    await this.activateUseCase.execute({ id });
  }
}
