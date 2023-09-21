import { EntityMarker } from "../../shared/domain/markers/entity.marker";

export default interface IRepository<E extends EntityMarker> {
    insert(entity: E): Promise<string>;
    findById(id: string): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string): Promise<void>;
    getActiveRecords(): Promise<E[]>;
    getInactiveRecords(): Promise<E[]>;
}