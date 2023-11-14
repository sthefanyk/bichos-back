import { StatusSponsorship } from "src/@core/shared/domain/enums/status_sponsorship.enum";

export type SponsorshipOutputDto = {
    id: string;
    id_godfather: string;
    id_post: string;
    status: StatusSponsorship;
    feedback_poster: string;
    feedback_godfather: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}