import { Personality } from "src/@core/domain/entities/personality";
import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";

export type SponsorshipPostUpdateInputDto = any

export type SponsorshipPostOutputDto = {
    urgent: boolean;
    posted_by: string;
    renewal_count: number;
    type: TypePost;
    urgency_justification: string;
    animal: {
        name: string;
        sex: SexAnimal;
        date_birth: Date;
        species: Species;
        history: string;
        characteristic: string;
        personalities:Personality[];
        accompany: boolean;
        reason_request: string;
        id: string,
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
    };
    contact: {
        name: string,
        email: string,
        phone: string,
        city: string
    }
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}