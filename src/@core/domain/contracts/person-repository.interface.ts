import {
  PersonCreate,
  PersonFindAll,
  PersonFindById,
  PersonGetActiveRecords,
  PersonGetInactiveRecords,
  PersonUpdate,
} from 'src/@core/application/use-cases/person';
import Person from '../entities/users/person';
import { IUserRepository } from './user-repository.interface';
import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { PersonFindByCpf } from 'src/@core/application/use-cases/person/find-by-cpf.usecase';

export interface IPersonRepository extends IUserRepository {
  insert(entity: Person): PersonCreate.Output;
  findById(id: string): PersonFindById.Output;
  findAll(): PersonFindAll.Output;
  update(entity: Person): PersonUpdate.Output;
  getActiveRecords(): PersonGetActiveRecords.Output;
  getInactiveRecords(): PersonGetInactiveRecords.Output;
  findByCpf(cpf: CPF): PersonFindByCpf.Output;
}
