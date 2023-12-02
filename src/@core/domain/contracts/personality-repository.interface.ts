import {
  PersonalityCreate,
  PersonalityFindById,
  PersonalityUpdate,
  PersonalityActivate,
  PersonalityInactivate,
  PersonalitySearch,
  PersonalityGetActiveRecords,
  PersonalityGetInactiveRecords,
  PersonalityFindByName,
} from '../../application/use-cases/personality';
import { Personality } from '../entities/personality';

export interface IPersonalityRepository {
  insert(entity: Personality): PersonalityCreate.Output;
  update(entity: Personality): PersonalityUpdate.Output;
  activate(entity: Personality): PersonalityActivate.Output;
  inactivate(entity: Personality): PersonalityInactivate.Output;
  findById(id: string): PersonalityFindById.Output;
  findByName(name: string): PersonalityFindByName.Output;
  findAll(): PersonalitySearch.Output;
  getActiveRecords(): PersonalityGetActiveRecords.Output;
  getInactiveRecords(): PersonalityGetInactiveRecords.Output;
}
