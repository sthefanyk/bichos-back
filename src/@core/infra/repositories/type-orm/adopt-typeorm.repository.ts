import {
  AdoptFindById,
  AdoptSearch,
  AdoptUsecase,
  ChooseAdopter,
  GetAdopterByAdoptPostId,
} from '../../../application/use-cases/adopt';
import { EvaluateResponses } from '../../../application/use-cases/adopt/evaluate-responses.usecase';
import { IAdoptRepository } from '../../../domain/contracts';
import { Adopt } from '../../../domain/entities/adopt/adopt';
import { Response } from '../../../domain/entities/adopt/response';
import {
  AdoptModel,
  PostModel,
  QuestionModel,
  QuizModel,
  ResponseModel,
  UserModel,
} from '../../../domain/models';
import { DataSource, Repository } from 'typeorm';
import { UserTypeormRepository } from './user-typeorm.repository';

export class AdoptTypeormRepository implements IAdoptRepository {
  private repoAdopt: Repository<AdoptModel>;
  private repoUser: Repository<UserModel>;
  private repoQuiz: Repository<QuizModel>;
  private repoPost: Repository<PostModel>;
  private repoResponse: Repository<ResponseModel>;
  private repoQuestion: Repository<QuestionModel>;
  private userRepo: UserTypeormRepository;

  constructor(private dataSource: DataSource) {
    this.repoAdopt = this.dataSource.getRepository(AdoptModel);
    this.repoUser = this.dataSource.getRepository(UserModel);
    this.repoQuiz = this.dataSource.getRepository(QuizModel);
    this.repoPost = this.dataSource.getRepository(PostModel);
    this.repoResponse = this.dataSource.getRepository(ResponseModel);
    this.repoQuestion = this.dataSource.getRepository(QuestionModel);
    this.userRepo = new UserTypeormRepository(dataSource);
  }

  async getAdopterByAdoptPostId(
    id_post: string,
  ): GetAdopterByAdoptPostId.Output {
    const adopt = await this.repoAdopt.findOne({
      where: { post: { id: id_post }, status: 5 },
      relations: ['adopter', 'quiz', 'post'],
    });

    if (!adopt) return null;

    const user = await this.userRepo.findUserById(adopt.adopter.id);
    return user;
  }

  async updateStatus(entity: Adopt): ChooseAdopter.Output {
    await this.repoAdopt.update(entity.id, {
      status: entity.status,
    });

    return { id: entity.id_adopter };
  }

  async evaluateResponses(entity: Adopt): EvaluateResponses.Output {
    for (const response of entity.responses) {
      await this.repoResponse.update(response.id, {
        evaluation: response.evaluation,
      });
    }
  }

  async findById(id: string): AdoptFindById.Output {
    const adopt = await this.repoAdopt.findOne({
      where: { id },
      relations: ['adopter', 'quiz', 'post'],
    });

    const responses = await this.repoResponse.find({
      where: { adopt: { id: adopt.id } },
      relations: ['question', 'adopt'],
    });

    return new Adopt({
      ...adopt,
      status: +adopt.status,
      id_adopter: adopt.adopter.id,
      id_post: adopt.post.id,
      id_quiz: adopt.quiz.id,
      responses: responses.map(
        (r) =>
          new Response({
            id: r.id,
            id_adopt: r.adopt.id,
            id_question: r.question.id,
            response: r.response,
            evaluation: +r.evaluation,
          }),
      ),
    });
  }

  async findAll(): AdoptSearch.Output {
    const result = await this.repoAdopt.find({
      relations: ['adopter', 'post', 'quiz'],
    });

    const adopts: Adopt[] = [];

    for (const adopt of result) {
      const responses = await this.repoResponse.find({
        where: { adopt: { id: adopt.id } },
        relations: ['question', 'adopt'],
      });

      adopts.push(
        new Adopt({
          ...adopt,
          status: +adopt.status,
          id_adopter: adopt.adopter.id,
          id_post: adopt.post.id,
          id_quiz: adopt.quiz.id,
          responses: responses.map(
            (r) =>
              new Response({
                id: r.id,
                id_adopt: r.adopt.id,
                id_question: r.question.id,
                response: r.response,
                evaluation: +r.evaluation,
              }),
          ),
        }),
      );
    }

    return adopts;
  }

  async adopt(entity: Adopt): AdoptUsecase.Output {
    const [adopter, quiz, post] = await Promise.all([
      this.repoUser.findOne({ where: { id: entity.id_adopter } }),
      this.repoQuiz.findOne({ where: { id: entity.id_quiz } }),
      this.repoPost.findOne({ where: { id: entity.id_post }, relations: [ 'posted_by' ] }),
    ]);

    const adopt = await this.repoAdopt.save({
      ...entity.toJson(),
      adopter,
      post,
      quiz,
    });

    for (const response of entity.responses) {
      const question = await this.repoQuestion.findOne({
        where: { id: response.id_question },
      });
      await this.repoResponse.save({
        id: response.id,
        adopt,
        evaluation: response.evaluation,
        question,
        response: response.response,
      });
    }

    return {
      id: adopt.id,
      id_poster: post.posted_by.id
    };
  }
}
