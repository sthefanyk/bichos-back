import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalSponsorship } from "../entities/posts/animal-sponsorship";
import AnimalSponsorshipModel from "../models/animal-sponsorship";
import { AnimalMapper } from "./animal.mapper";
import { Post } from "../entities/posts/post";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";
import { Personality } from "../entities/personality";
import { Need } from "../entities/need";
import Phone from "src/@core/shared/domain/value-objects/phone.vo";
import { Contact } from "../entities/contact";
import { City } from "../entities/localization/city";

export class AnimalSponsorshipMapper implements MapperMarker {

    static getModel(entity: AnimalSponsorship) : AnimalSponsorshipModel {
        const animal = AnimalMapper.getModel(entity);

        return {
            id: animal.id,
            accompany: entity.accompany,
            reason_request: entity.reason_request,
            animal,
        };
    }

    static getEntityWithJsonData(data: {
        animal_sponsorship_accompany: string;
        animal_sponsorship_reason_request: string;
        needs: Need[];

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
        type: string;
        urgency_justification: string;

        post_id: string,
        post_created_at: string,
        post_updated_at: string,
        post_deleted_at: string,

        contact_name: string;
        contact_email: string;
        contact_phone: string;
        
        city: City;
    }): Post {
        const animal = new AnimalSponsorship({
            accompany: data.animal_sponsorship_accompany === "true",
            reason_request: data.animal_sponsorship_reason_request,
            needs: data.needs
        }, {
            name: data.name,
            sex: +data.sex,
            date_birth: new Date(data.date_birth),
            species: +data.species,
            history: data.history,
            characteristic: data.characteristic,
            personalities:data.personalities,

            id: data.animal,
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
            deleted_at: new Date(data.deleted_at),
        });

        return new Post({
            urgent: data.urgent === "true",
            posted_by: new UUID(data.user_id),
            renewal_count: +data.renewal_count,
            type: +data.type,
            urgency_justification: data.urgency_justification,
            animal,
            contact: new Contact({
                name: data.contact_name,
                email: data.contact_email,
                phone: new Phone(data.contact_phone),
                city: data.city
            }),

            id: data.post_id,
            created_at: new Date(data.post_created_at),
            updated_at: new Date(data.post_updated_at),
            deleted_at: new Date(data.post_deleted_at),
            
        });
    }
}