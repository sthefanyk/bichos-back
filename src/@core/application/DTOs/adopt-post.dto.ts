import { SexAnimal } from "src/@core/shared/domain/enums/sex-animal";
import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Species } from "src/@core/shared/domain/enums/species.enum";
import { StatusPost } from "src/@core/shared/domain/enums/status_post.enum";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";

export type AdoptPostUpdateInputDto = any

export type AdoptPostOutputDto = {
    urgent: boolean;
    posted_by: string;
    renewal_count: number;
    status: StatusPost;
    type: TypePost;
    urgency_justification: string;
    animal: {
        name: string;
        sex: SexAnimal;
        date_birth: Date;
        species: Species;
        history: string;
        characteristic: string;
        size_current: SizeAnimal;
        size_estimated: SizeAnimal;
        id: string,
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
    };
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}