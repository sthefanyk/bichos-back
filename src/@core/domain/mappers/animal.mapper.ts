import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { Animal } from "../entities/posts/animal";
import AnimalModel from "../models/animal.model";

export class AnimalMapper implements MapperMarker {
    static getModel(entity: Animal): AnimalModel {
        return {
            id: entity.id,
            name: entity.name,
            date_birth: entity.date_birth.toDateString(),
            sex: entity.sex,
            species: entity.species,
            history: entity.history,
            characteristic: entity.characteristic,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        }
    }
}