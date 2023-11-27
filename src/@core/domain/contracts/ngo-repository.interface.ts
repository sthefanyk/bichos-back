import NGO from '../entities/users/ngo';
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
import { UserFindByEmail, UserFindByUsername } from 'src/@core/application/use-cases/user';

export interface INGORepository {
  insert(entity: NGO): NGOCreate.Output;
  findById(id: string): NGOFindById.Output;
  findAll(): NGOFindAll.Output;
  update(entity: NGO): NGOUpdate.Output;
  getActiveRecords(): NGOGetActiveRecords.Output;
  getInactiveRecords(): NGOGetInactiveRecords.Output;
  findByCnpj(cnpj: CNPJ): NGOFindByCnpj.Output;
  findByUsername(username: string): UserFindByUsername.Output;
  findByEmail(email: string): UserFindByEmail.Output;
}
