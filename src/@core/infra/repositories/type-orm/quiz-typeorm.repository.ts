import {
  QuizCreate,
  AddQuestionToQuiz,
  RemoveQuestionToQuiz,
} from '../../../application/use-cases/quiz';
import { IQuizRepository } from '../../../domain/contracts';
import { Alternative } from '../../../domain/entities/quiz/alternative';
import { Question } from '../../../domain/entities/quiz/question';
import { Quiz } from '../../../domain/entities/quiz/quiz';
import {
  AlternativeModel,
  QuestionModel,
  QuizHasQuestionModel,
  QuizModel,
} from '../../../domain/models';
import { DataSource, Repository } from 'typeorm';

export class QuizTypeormRepository implements IQuizRepository {
  private quizRepo: Repository<QuizModel>;
  private questionRepo: Repository<QuestionModel>;
  private alternativeRepo: Repository<AlternativeModel>;
  private quizHasQuestionRepo: Repository<QuizHasQuestionModel>;

  constructor(private dataSource: DataSource) {
    this.quizRepo = this.dataSource.getRepository(QuizModel);
    this.questionRepo = this.dataSource.getRepository(QuestionModel);
    this.alternativeRepo = this.dataSource.getRepository(AlternativeModel);
    this.quizHasQuestionRepo =
      this.dataSource.getRepository(QuizHasQuestionModel);
  }

  async findAllQuiz(): Promise<Quiz[]> {
    const result = await this.quizRepo.find();

    const quizzes: Quiz[] = [];

    for (const quiz of result) {
      const questions: Question[] = await this.getQuestions(quiz.id);
      quizzes.push(
        new Quiz({
          ...quiz,
          questions,
        }),
      );
    }

    return quizzes;
  }

  async createQuiz(entity: Quiz): QuizCreate.Output {
    const model = await this.quizRepo.save(entity.toJson());

    if (!model) return null;

    return { id: model.id };
  }

  async findQuizById(id: string): Promise<Quiz> {
    const quizModel = await this.quizRepo.findOne({ where: { id } });
    if (!quizModel) return null;

    const questions: Question[] = await this.getQuestions(id);

    return new Quiz({
      ...quizModel,
      questions,
    });
  }

  async findQuizByTitle(title: string): Promise<Quiz> {
    const quizModel = await this.quizRepo.findOne({ where: { title } });
    if (!quizModel) return null;

    const questions: Question[] = await this.getQuestions(quizModel.id);

    return new Quiz({
      ...quizModel,
      questions,
    });
  }

  async findQuestionById(id: string): Promise<Question> {
    const model = await this.questionRepo.findOne({ where: { id } });

    if (!model) return null;

    const alternativesModel = await this.alternativeRepo.find({
      where: { id_question: id },
    });
    const alternatives = alternativesModel.map((a) => new Alternative(a));

    return new Question({
      ...model,
      type: +model.type,
      alternatives,
    });
  }

  async addQuestionToQuiz(
    id_quiz: string,
    entity: Question,
  ): AddQuestionToQuiz.Output {
    const question = await this.questionRepo.save(entity.toJson());

    for (const alternative of entity.alternatives) {
      await this.alternativeRepo.save({
        id: alternative.id,
        id_question: question.id,
        alternative: alternative.alternative,
      });
    }

    await this.quizHasQuestionRepo.save({
      id_question: question.id,
      id_quiz,
    });
  }

  async removeQuestionToQuiz(id_question: string): RemoveQuestionToQuiz.Output {
    await this.quizHasQuestionRepo
      .createQueryBuilder()
      .delete()
      .where('id_question = :id_question', { id_question })
      .execute();

    await this.questionRepo
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id_question })
      .execute();

    await this.alternativeRepo
      .createQueryBuilder()
      .delete()
      .where('id_question = :id_question', { id_question })
      .execute();
  }

  async getQuestions(idQuiz: string): Promise<Question[]> {
    const quizHasQuestion = await this.quizHasQuestionRepo.find({
      where: { id_quiz: idQuiz },
    });

    const questions: Question[] = [];

    for (const question of quizHasQuestion) {
      const foundQuestion = await this.questionRepo.findOne({
        where: { id: question.id_question },
      });
      const alternatives = await this.alternativeRepo.find({
        where: { id_question: question.id_question },
      });
      questions.push(
        new Question({
          ...foundQuestion,
          type: +foundQuestion.type,
          alternatives: alternatives.map((a) => new Alternative(a)),
        }),
      );
    }

    return questions;
  }
}
