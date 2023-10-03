import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { Animal } from "../entities/posts/animal";
import AnimalModel from "../models/animal.model";

export class AnimalMapper implements MapperMarker {
    static getModel(entity: Animal): AnimalModel {
        const props = entity.getProps();
        return {
            id: props.id.getIdString(),
            name: props.name,
            date_birth: props.date_birth.toDateString(),
            sex: props.sex,
            species: props.species,
            history: props.history,
            characteristic: props.characteristic,
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at,
        }
    }
}