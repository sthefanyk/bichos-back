import { EvaluationResponse } from "src/@core/shared/domain/enums/evaluation-response.enum";
import { StatusAdopt } from "src/@core/shared/domain/enums/status_adopt.enum";

export type AdoptOutputDto = {
    id: string;
    id_adopter: string;
    id_post: string;
    id_quiz: string;
    punctuation: number;
    status: StatusAdopt;
    feedback_poster: string;
    feedback_godfather: string;
    responses: {
      id: string;
      id_question: string;
      id_adopt: string;
      response: string;
      evaluation: EvaluationResponse;
    }[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}