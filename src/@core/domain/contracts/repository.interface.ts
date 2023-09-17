import EntityProps from "../../shared/domain/entities/entity-props";
import Entity from "../../shared/domain/entities/entity";

export default interface IRepository<P extends EntityProps, E extends Entity<P>> {
    insert(entity: E): Promise<string>;
    findById(id: string): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string): Promise<void>;
    getActiveRecords(): Promise<E[]>;
    getInactiveRecords(): Promise<E[]>;
}