import EntityProps from "../../shared/domain/entities/entity-props";
import Entity from "../../shared/domain/entities/entity";

export default interface Model<P extends EntityProps, E extends Entity<P>> {
    getEntity(model: this): E;
}