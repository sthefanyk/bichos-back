import Personality from '../../../domain/entities/personality';
import PersonalityProps from '../../../domain/entities/personality-props';
import IPersonalityRepository from '../../../domain/contracts/personality-repository.interface';
import { TypeormRepository } from '../../../shared/domain/repositories/typeorm.repository';
import PersonalityModel from 'src/@core/domain/models/personality.model';

export class PersonalityTypeormRepository
  extends TypeormRepository<PersonalityProps, Personality, PersonalityModel>
  implements IPersonalityRepository {}
