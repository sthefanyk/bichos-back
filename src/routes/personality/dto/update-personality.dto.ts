import { PersonalityUpdate } from 'src/@core/application/use-cases/personality';
import { CreatePersonalityDto } from './create-personality.dto';

export class UpdatePersonalityDto
  extends CreatePersonalityDto
  implements Omit<PersonalityUpdate.Input, 'id'> {}
