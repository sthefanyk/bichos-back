import Shelter from '../entities/users/shelter';
import { IUserRepository } from './user-repository.interface';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import {
  ShelterCreate,
  ShelterFindAll,
  ShelterFindById,
  ShelterGetActiveRecords,
  ShelterGetInactiveRecords,
  ShelterUpdate,
} from 'src/@core/application/use-cases/shelter';
import { ShelterFindByCpf } from 'src/@core/application/use-cases/shelter/find-by-cpf.usecase';
import { ShelterFindByNameShelter } from 'src/@core/application/use-cases/shelter/find-by-name-shelter.usecase';

export interface IShelterRepository extends IUserRepository {
  insert(entity: Shelter): ShelterCreate.Output;
  findById(id: string): ShelterFindById.Output;
  findByNameShelter(name_shelter: string): ShelterFindByNameShelter.Output;
  findAll(): ShelterFindAll.Output;
  update(entity: Shelter): ShelterUpdate.Output;
  getActiveRecords(): ShelterGetActiveRecords.Output;
  getInactiveRecords(): ShelterGetInactiveRecords.Output;
  findByCpf(cpf: CPF): ShelterFindByCpf.Output;
}
