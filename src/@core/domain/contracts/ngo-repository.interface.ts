import NGO from '../entities/users/ngo';
import { IUserRepository } from './user-repository.interface';
import CNPJ from 'src/@core/shared/domain/value-objects/cnpj.vo';
import {
  NGOCreate,
  NGOFindAll,
  NGOFindByCnpj,
  NGOFindById,
  NGOGetActiveRecords,
  NGOGetInactiveRecords,
  NGOUpdate,
} from 'src/@core/application/use-cases/ngo';

export interface INGORepository extends IUserRepository {
  insert(entity: NGO): NGOCreate.Output;
  findById(id: string): NGOFindById.Output;
  findAll(): NGOFindAll.Output;
  update(entity: NGO): NGOUpdate.Output;
  getActiveRecords(): NGOGetActiveRecords.Output;
  getInactiveRecords(): NGOGetInactiveRecords.Output;
  findByCnpj(cnpj: CNPJ): NGOFindByCnpj.Output;
}
