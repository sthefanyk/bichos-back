import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalAdopt } from "../entities/posts/animal-adopt";
import AnimalAdoptModel from "../models/animal-adopt";
import { AnimalMapper } from "./animal.mapper";
import { Post } from "../entities/posts/post";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";
import { Personality } from "../entities/personality";
import { Breed } from "../entities/breed";

export class AnimalAdoptMapper implements MapperMarker {

    static getModel(entity: AnimalAdopt) : AnimalAdoptModel {
        const animal = AnimalMapper.getModel(entity);

        return {
            id: animal.id,
            size_current: entity.size_current,
            size_estimated: entity.size_estimated,
            breed: entity.breed,
            animal,
        };
    }

    static getEntityWithJsonData(data: {
        animal_adopt_size_current: string;
        animal_adopt_size_estimated: string;
        breed: Breed;

        name: string;
        sex: string;
        date_birth: string;
        species: string;
        history: string;
        characteristic: string;
        personalities: Personality[];

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
            breed: data.breed
        }, {
            name: data.name,
            sex: +data.sex,
            date_birth: new Date(data.date_birth),
            species: +data.species,
            history: data.history,
            characteristic: data.characteristic,
            personalities: data.personalities,

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