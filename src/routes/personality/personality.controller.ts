import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePersonalityDto } from './dto/create-personality.dto';
import { UpdatePersonalityDto } from './dto/update-personality.dto';
import { CreatePersonalityUseCase } from '#personality/application/use-cases/create-personality.usecase';
import { UpdatePersonalityUseCase } from '#personality/application/use-cases/update-personality.usecase';
import { DeletePersonalityUseCase } from '#personality/application/use-cases/delete-personality.usecase';
import { GetPersonalityUseCase } from '#personality/application/use-cases/get-personality.usecase';
import { ListPersonalitiesUseCase } from '#personality/application/use-cases/list-personalities.usecase';
import { PersonalityOutput } from '#personality/application/dto/personality-output.dto';
import {
  PersonalityCollectionPresenter,
  PersonalityPresenter,
} from './presenter/personality.presenter';
import { SearchPersonalityDto } from './dto/search-personality.dto';

@Controller('personality')
export class PersonalityController {
  // constructor(private readonly personalityService: PersonalityService) {}
  @Inject(CreatePersonalityUseCase.UseCase)
  private createUseCase: CreatePersonalityUseCase.UseCase;

  @Inject(UpdatePersonalityUseCase.UseCase)
  private updateUseCase: UpdatePersonalityUseCase.UseCase;

  @Inject(DeletePersonalityUseCase.UseCase)
  private deleteUseCase: DeletePersonalityUseCase.UseCase;

  @Inject(GetPersonalityUseCase.UseCase)
  private getUseCase: GetPersonalityUseCase.UseCase;

  @Inject(ListPersonalitiesUseCase.UseCase)
  private listUseCase: ListPersonalitiesUseCase.UseCase;

  @Post()
  async create(@Body() createPersonalityDto: CreatePersonalityDto) {
    const output = await this.createUseCase.execute(createPersonalityDto);
    return PersonalityController.personalityToResponse(output);
  }

  @Get()
  async search(@Query() searchParams: SearchPersonalityDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new PersonalityCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return PersonalityController.personalityToResponse(output);
  }

  @Put(':id') //PUT vs PATCH
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updatePersonalityDto: UpdatePersonalityDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updatePersonalityDto,
    });
    return PersonalityController.personalityToResponse(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static personalityToResponse(output: PersonalityOutput) {
    return new PersonalityPresenter(output);
  }
}
