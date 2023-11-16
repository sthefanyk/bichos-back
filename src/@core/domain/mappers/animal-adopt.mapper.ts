import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalAdopt } from "../entities/posts/animal-adopt";
import { Post } from "../entities/posts/post";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";
import { Personality } from "../entities/personality";
import { Health } from "../entities/health/health";
import { DiseaseAllergy } from "../entities/health/disease-allergy";
import { VaccineMedicine } from "../entities/health/vaccine-medicine";
import { Dose } from "../entities/health/dose";
import { Contact } from "../entities/contact";
import Phone from "src/@core/shared/domain/value-objects/phone.vo";
import { City } from "../entities/localization/city";

export class AnimalAdoptMapper implements MapperMarker {
    static getEntityWithJsonData(data: {
        animal_adopt_size_current: string;
        animal_adopt_size_estimated: string;
        animal_adopt_breed: string;
        health: any;

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
        const animal = new AnimalAdopt({
            size_current: +data.animal_adopt_size_current,
            size_estimated: +data.animal_adopt_size_estimated,
            breed: data.animal_adopt_breed,
            health: new Health({
                additional: data.health.additional,
                neutered: data.health.neutered,
                disease_allergy: data.health.disease_allergy.map(
                    item => new DiseaseAllergy({...item, type: +item.type}) 
                ),
                vaccines_medicines: data.health.vaccines_medicines.map(
                    item => new VaccineMedicine({
                        ...item,
                        type: +item.type,
                        doses: item.doses.map(item => new Dose(item))
                    })
                ),
            }),
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

        return post;
    }
}