import {
  AdoptFindById,
  AdoptSearch,
  AdoptUsecase,
  ChooseAdopter,
  GetAdopterByAdoptPostId,
} from '../../application/use-cases/adopt';
import { Adopt } from '../entities/adopt/adopt';
import { EvaluateResponses } from '../../application/use-cases/adopt/evaluate-responses.usecase';

export interface IAdoptRepository {
  adopt(entity: Adopt): AdoptUsecase.Output;
  evaluateResponses(entity: Adopt): EvaluateResponses.Output;
  findById(id: string): AdoptFindById.Output;
  findAll(): AdoptSearch.Output;
  updateStatus(entity: Adopt): ChooseAdopter.Output;
  getAdopterByAdoptPostId(id_post: string): GetAdopterByAdoptPostId.Output;
}
