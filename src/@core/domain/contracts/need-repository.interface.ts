import {
  NeedCreate,
  NeedFindById,
  NeedUpdate,
  NeedActivate,
  NeedInactivate,
  NeedSearch,
  NeedGetActiveRecords,
  NeedGetInactiveRecords,
  NeedFindByName,
} from '../../application/use-cases/need';
import { Need } from '../entities/need';

export interface INeedRepository {
  insert(entity: Need): NeedCreate.Output;
  update(entity: Need): NeedUpdate.Output;
  activate(entity: Need): NeedActivate.Output;
  inactivate(entity: Need): NeedInactivate.Output;
  findById(id: string): NeedFindById.Output;
  findByName(name: string): NeedFindByName.Output;
  findAll(): NeedSearch.Output;
  getActiveRecords(): NeedGetActiveRecords.Output;
  getInactiveRecords(): NeedGetInactiveRecords.Output;
}
