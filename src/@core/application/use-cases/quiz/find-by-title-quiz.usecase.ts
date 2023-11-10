import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { IQuizRepository } from "src/@core/domain/contracts";
import { Quiz } from "src/@core/domain/entities/quiz/quiz";

export namespace QuizFindByTitle {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IQuizRepository){}
    
        async execute(input: Input): Output {
            const quiz = await this.repo.findQuizByTitle(input.title);

            if (!quiz) {
                throw new NotFoundError("Quiz not found");
            }

            return quiz;
        }
    }
    
    export type Input = {
        title: string
    }
    
    export type Output = Promise<Quiz>
}