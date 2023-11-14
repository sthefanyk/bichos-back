import { QuestionTypes } from "src/@core/shared/domain/enums/question-types.enum";

export type AdoptPostUpdateInputDto = any

export type QuizOutputDto = {
    title: string;
    description: string;
    questions: {
        question: string;
        type: QuestionTypes;
        others: boolean;
        alternatives: {
            id: string;
            alternative: string;
        }[];

        id: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    }[];

    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}