import Personality from '../../../domain/entities/personality';
import IPersonalityRepository from '../../../domain/contracts/personality-repository.interface';
import PersonalityModel from 'src/@core/domain/models/personality.model';
import { Repository } from 'typeorm';

export class PersonalityTypeormRepository
  // extends TypeormRepository<Personality, PersonalityModel>
  implements IPersonalityRepository {
  
  constructor(protected repo: Repository<PersonalityModel>) {}

  insert(entity: Personality): Promise<string> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Personality> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Personality[]> {
    throw new Error('Method not implemented.');
  }

  update(entity: Personality): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getActiveRecords(): Promise<Personality[]> {
    throw new Error('Method not implemented.');
  }
  
  getInactiveRecords(): Promise<Personality[]> {
    throw new Error('Method not implemented.');
  }
}
