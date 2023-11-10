import { AddQuestionToQuiz, QuizCreate, RemoveQuestionToQuiz } from "src/@core/application/use-cases/quiz";
import { Quiz } from "../entities/quiz/quiz";
import { Question } from "../entities/quiz/question";

export interface IQuizRepository {
    createQuiz(entity: Quiz): QuizCreate.Output;
    findQuizByTitle(title: string): Promise<Quiz>;
    findQuestionById(id: string): Promise<Question>;
    findQuizById(id: string): Promise<Quiz>;
    addQuestionToQuiz(id: string, entity: Question): AddQuestionToQuiz.Output;
    removeQuestionToQuiz(id_question: string): RemoveQuestionToQuiz.Output;
}