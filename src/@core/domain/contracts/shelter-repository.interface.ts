import Shelter from '../entities/users/shelter';
import CPF from '../../shared/domain/value-objects/cpf.vo';
import {
  ShelterCreate,
  ShelterFindAll,
  ShelterFindById,
  ShelterGetActiveRecords,
  ShelterGetInactiveRecords,
  ShelterUpdate,
} from '../../application/use-cases/shelter';
import { ShelterFindByCpf } from '../../application/use-cases/shelter/find-by-cpf.usecase';
import { ShelterFindByNameShelter } from '../../application/use-cases/shelter/find-by-name-shelter.usecase';
import {
  UserFindByEmail,
  UserFindByUsername,
} from '../../application/use-cases/user';

export interface IShelterRepository {
  insert(entity: Shelter): ShelterCreate.Output;
  findById(id: string): ShelterFindById.Output;
  findByNameShelter(name_shelter: string): ShelterFindByNameShelter.Output;
  findAll(): ShelterFindAll.Output;
  update(entity: Shelter): ShelterUpdate.Output;
  getActiveRecords(): ShelterGetActiveRecords.Output;
  getInactiveRecords(): ShelterGetInactiveRecords.Output;
  findByCpf(cpf: CPF): ShelterFindByCpf.Output;
  findByEmail(email: string): UserFindByEmail.Output;
  findByUsername(username: string): UserFindByUsername.Output;
}
