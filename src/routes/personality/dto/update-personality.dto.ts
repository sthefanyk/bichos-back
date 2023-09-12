import { CreatePersonalityDto } from './create-personality.dto';
import { UpdatePersonalityUseCase } from '#personality/application/use-cases/update-personality.usecase';

export class UpdatePersonalityDto
  extends CreatePersonalityDto
  implements Omit<UpdatePersonalityUseCase.Input, 'id'> {}
