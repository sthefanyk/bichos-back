import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonalityDto } from './dto/create-personality.dto';
import {
  PersonalityCreate,
  PersonalityDelete,
  PersonalityFindAll,
  PersonalityFindById,
  PersonalitySearch,
  PersonalityUpdate,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords
} from 'src/@core/application/use-cases/personality';
import { SearchPersonalityDto } from './dto/search-personality.dto';
import { UpdatePersonalityDto } from './dto/update-personality.dto';
import PersonalityProps from 'src/@core/domain/entities/personality-props';
import { PersonalityCollectionPresenter, PersonalityPresenter } from './presenter/personality.presenter';

@Injectable()
export class PersonalityService {
  @Inject(PersonalityCreate.Usecase)
  private createUseCase: PersonalityCreate.Usecase;

  @Inject(PersonalityFindAll.Usecase)
  private listUseCase: PersonalityFindAll.Usecase;

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

  @Inject(PersonalityDelete.Usecase)
  private deleteUseCase: PersonalityDelete.Usecase;

  async create(data: CreatePersonalityDto) {
    const props = new PersonalityProps(data.name);
    return this.createUseCase.execute(props);
  }

  async findAll(searchParams: SearchPersonalityDto) {
    const output = await this.searchUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async getActiveRecords(searchParams: SearchPersonalityDto) {
    const output = await this.getActiveRecordsUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async getInactiveRecords(searchParams: SearchPersonalityDto) {
    const output = await this.getInactiveRecordsUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  async findOne(id: string) {
    const output = await this.getUseCase.execute({ id });
    return output;
    // return PersonalitiesService.usersToResponse(output);
  }

  async update(id: string, updatePersonalitiesDto: UpdatePersonalityDto) {
    const output = await this.updateUseCase.execute({
      id,
      ...updatePersonalitiesDto,
    });
    return output;
    // return PersonalitiesService.usersToResponse(output);
  }

  remove(id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static usersToResponse(output: Output) {
    return new PersonalityPresenter(output);
  }
}

export type Output = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
