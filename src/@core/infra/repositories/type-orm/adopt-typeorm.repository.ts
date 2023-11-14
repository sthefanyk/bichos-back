import { AdoptFindById, AdoptSearch, AdoptUsecase } from 'src/@core/application/use-cases/adopt';
import { IAdoptRepository } from 'src/@core/domain/contracts';
import { Adopt } from 'src/@core/domain/entities/adopt/adopt';
import { Response } from 'src/@core/domain/entities/adopt/response';
import AdoptModel from 'src/@core/domain/models/adopt.model';
import PostModel from 'src/@core/domain/models/post.model';
import QuestionModel from 'src/@core/domain/models/question.model';
import QuizModel from 'src/@core/domain/models/quiz.model';
import ResponseModel from 'src/@core/domain/models/response.model';
import UserModel from 'src/@core/domain/models/user.model';
import { DataSource, Repository } from 'typeorm';

export class AdoptTypeormRepository implements IAdoptRepository {
  private repoAdopt: Repository<AdoptModel>;
  private repoUser: Repository<UserModel>;
  private repoQuiz: Repository<QuizModel>;
  private repoPost: Repository<PostModel>;
  private repoResponse: Repository<ResponseModel>;
  private repoQuestion: Repository<QuestionModel>;

  constructor(private dataSource: DataSource) {
    this.repoAdopt = this.dataSource.getRepository(AdoptModel);
    this.repoUser = this.dataSource.getRepository(UserModel);
    this.repoQuiz = this.dataSource.getRepository(QuizModel);
    this.repoPost = this.dataSource.getRepository(PostModel);
    this.repoResponse = this.dataSource.getRepository(ResponseModel);
    this.repoQuestion = this.dataSource.getRepository(QuestionModel);
  }

  async findById(id: string): AdoptFindById.Output {
    const adopt = await this.repoAdopt.findOne({ 
      where: { id }, relations: ['adopter', 'quiz', 'post']
    });

    const responses = await this.repoResponse.find({ 
      where: { adopt }, relations: ['question', 'adopt']
    });

    return new Adopt({
      ...adopt,
      status: +adopt.status,
      id_adopter: adopt.adopter.id,
      id_post: adopt.post.id,
      id_quiz: adopt.quiz.id,
      responses: responses.map(r => new Response({
        id: r.id,
        id_adopt: r.adopt.id,
        id_question: r.question.id,
        response: r.response,
        evaluation: +r.evaluation,
      }))
    });
  }

  async findAll(): AdoptSearch.Output {
    const result = await this.repoAdopt.find({relations: ['adopter', 'post', 'quiz'] });
    
    const adopts: Adopt[] = [];
    
    for (const adopt of result) {
      const responses = await this.repoResponse.find({ 
        where: { adopt }, relations: ['question', 'adopt']
      });
      
      adopts.push(new Adopt({
        ...adopt,
        status: +adopt.status,
        id_adopter: adopt.adopter.id,
        id_post: adopt.post.id,
        id_quiz: adopt.quiz.id,
        responses: responses.map(r => new Response({
          id: r.id,
          id_adopt: r.adopt.id,
          id_question: r.question.id,
          response: r.response,
          evaluation: +r.evaluation,
        }))
      }));
    }

    return adopts;
  }

  async adopt(entity: Adopt): AdoptUsecase.Output {
    const [adopter, quiz, post] = await Promise.all([
      this.repoUser.findOne({ where: { id: entity.id_adopter } }),
      this.repoQuiz.findOne({ where: { id: entity.id_quiz } }),
      this.repoPost.findOne({ where: { id: entity.id_post } }),
    ]);    

    const adopt = await this.repoAdopt.save({
      ...entity.toJson(),
      adopter,
      post,
      quiz,
    });

    for (const response of entity.responses) {
      const question = await this.repoQuestion.findOne({where: { id: response.id_question }})
      await this.repoResponse.save({
        id: response.id,
        adopt,
        evaluation: response.evaluation,
        question,
        response: response.response
      });
    }

    return {
      id: adopt.id
    }
  }
}
