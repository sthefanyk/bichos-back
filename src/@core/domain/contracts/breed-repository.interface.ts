import {
  BreedCreate,
  BreedFindById,
  BreedUpdate,
  BreedActivate,
  BreedInactivate,
  BreedFindByName,
  BreedFindBySpecie,
} from '../../application/use-cases/breed';
import { Breed } from '../entities/breed';
import { Species } from '../../shared/domain/enums/species.enum';

export interface IBreedRepository {
  insert(entity: Breed): BreedCreate.Output;
  update(entity: Breed): BreedUpdate.Output;
  activate(entity: Breed): BreedActivate.Output;
  inactivate(entity: Breed): BreedInactivate.Output;
  findById(id: string): BreedFindById.Output;
  findByName(name: string): BreedFindByName.Output;
  findBySpecie(specie: Species): BreedFindBySpecie.Output;
  findAll(): Promise<Breed[]>;
  getActiveRecords(): Promise<Breed[]>;
  getInactiveRecords(): Promise<Breed[]>;
}
