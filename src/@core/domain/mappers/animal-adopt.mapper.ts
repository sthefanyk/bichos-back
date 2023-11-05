import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalAdopt } from "../entities/posts/animal-adopt";
import AnimalAdoptModel from "../models/animal-adopt";
import { AnimalMapper } from "./animal.mapper";
import { Post } from "../entities/posts/post";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";

export class AnimalAdoptMapper implements MapperMarker {

    static getModel(entity: AnimalAdopt) : AnimalAdoptModel {
        const animal = AnimalMapper.getModel(entity);

        return {
            id: animal.id,
            size_current: (entity as any).size_current,
            size_estimated: (entity as any).size_estimated,
            animal,
        };
    }

    static getJsonWithEntity(entity: Post) {
        const propsAnimal = entity.animal;
        return {
            id: entity.id,
            urgent: entity.urgent,
            posted_by: entity.posted_by,
            renewal_count: entity.renewal_count,
            status: entity.status,
            type: entity.type,
            urgency_justification: entity.urgency_justification,
            animal: {
                id: propsAnimal.id,
                name: propsAnimal.name,
                sex: propsAnimal.sex,
                date_birth: propsAnimal.date_birth,
                species: propsAnimal.species,
                history: propsAnimal.history,
                characteristic: propsAnimal.characteristic,
                size_current: (propsAnimal as any).size_current,
                size_estimated: (propsAnimal as any).size_estimated,
                created_at: propsAnimal.created_at,
                updated_at: propsAnimal.updated_at,
                deleted_at: propsAnimal.deleted_at,
            },
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        };
    }

    static getEntityWithJsonData(data: {
        animal_adopt_size_current: string;
        animal_adopt_size_estimated: string;

        name: string;
        sex: string;
        date_birth: string;
        species: string;
        history: string;
        characteristic: string;

        animal: string,
        created_at: string,
        updated_at: string,
        deleted_at: string,

        urgent: string;
        user_id: string;
        renewal_count: string;
        status: string;
        type: string;
        urgency_justification: string;

        post_id: string,
        post_created_at: string,
        post_updated_at: string,
        post_deleted_at: string,

    }): Post {
        const animal = new AnimalAdopt({
            size_current: +data.animal_adopt_size_current,
            size_estimated: +data.animal_adopt_size_estimated,
        }, {
            name: data.name,
            sex: +data.sex,
            date_birth: new Date(data.date_birth),
            species: +data.species,
            history: data.history,
            characteristic: data.characteristic,

            id: data.animal,
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
            deleted_at: new Date(data.deleted_at),
        });

        const post = new Post({
            urgent: data.urgent === "true",
            posted_by: new UUID(data.user_id),
            renewal_count: +data.renewal_count,
            status: +data.status,
            type: +data.type,
            urgency_justification: data.urgency_justification,
            animal,

            id: data.post_id,
            created_at: new Date(data.post_created_at),
            updated_at: new Date(data.post_updated_at),
            deleted_at: new Date(data.post_deleted_at),
            
        });

        return post;
    }
}