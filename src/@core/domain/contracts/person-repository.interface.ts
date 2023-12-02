import {
  PersonCreate,
  PersonFindAll,
  PersonFindById,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
  PersonUpdate,
} from '../../application/use-cases/person';
import Person from '../entities/users/person';
import CPF from '../../shared/domain/value-objects/cpf.vo';
import { PersonFindByCpf } from '../../application/use-cases/person/find-by-cpf.usecase';
import {
  UserFindByEmail,
  UserFindByUsername,
} from '../../application/use-cases/user';

export interface IPersonRepository {
  insert(entity: Person): PersonCreate.Output;
  findById(id: string): PersonFindById.Output;
  findAll(): PersonFindAll.Output;
  update(entity: Person): PersonUpdate.Output;
  getActiveRecords(): PersonGetActiveRecords.Output;
  getInactiveRecords(): PersonGetInactiveRecords.Output;
  findByCpf(cpf: CPF): PersonFindByCpf.Output;
  findByUsername(username: string): UserFindByUsername.Output;
  findByEmail(email: string): UserFindByEmail.Output;
}
