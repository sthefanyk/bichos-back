import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonalityDto } from './dto/create-personality.dto';
import {
  CreatePersonalityUseCase,
  UpdatePersonalityUseCase,
  ListPersonalitiesUseCase,
} from '#personality/application/use-cases';

@Injectable()
export class PersonalityService {
  @Inject(CreatePersonalityUseCase.UseCase)
  private createUseCase: CreatePersonalityUseCase.UseCase;

  @Inject(ListPersonalitiesUseCase.UseCase)
  private listUseCase: ListPersonalitiesUseCase.UseCase;

  @Inject(UpdatePersonalityUseCase.UseCase)
  private updateUseCase: UpdatePersonalityUseCase.UseCase;

  create(createPersonalityDto: CreatePersonalityDto) {
    return this.createUseCase.execute(createPersonalityDto);
  }

  search(input: ListPersonalitiesUseCase.Input) {
    return this.listUseCase.execute(input);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
