import { AddQuestionToQuiz, QuizCreate, QuizFindById, RemoveQuestionToQuiz } from "src/@core/application/use-cases/quiz";
import { Quiz } from "../entities/quiz/quiz";
import { Question } from "../entities/quiz/question";
import { SearchQuiz } from "src/@core/application/use-cases/quiz/search.usecase";

export interface IQuizRepository {
    createQuiz(entity: Quiz): QuizCreate.Output;
    findQuizByTitle(title: string): Promise<Quiz>;
    findQuestionById(id: string): Promise<Question>;
    findQuizById(id: string): QuizFindById.Output;
    findAllQuiz(): SearchQuiz.Output;
    addQuestionToQuiz(id: string, entity: Question): AddQuestionToQuiz.Output;
    removeQuestionToQuiz(id_question: string): RemoveQuestionToQuiz.Output;
}