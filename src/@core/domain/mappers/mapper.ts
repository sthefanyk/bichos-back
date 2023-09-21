import { ModelMarker } from "../../shared/domain/markers/model.marker";
import { EntityMarker } from "../../shared/domain/markers/entity.marker";

export interface Mapper<E extends EntityMarker, M extends ModelMarker> {
    getEntity(model: M): E;
    getModel(entity: E): M;
}