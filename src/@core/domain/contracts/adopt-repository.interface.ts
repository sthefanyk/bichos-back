import { AdoptFindById, AdoptSearch, AdoptUsecase } from "src/@core/application/use-cases/adopt";
import { Adopt } from "../entities/adopt/adopt";
import { EvaluateResponses } from "src/@core/application/use-cases/adopt/evaluate-responses.usecase";

export interface IAdoptRepository {
    adopt(entity: Adopt): AdoptUsecase.Output;
    evaluateResponses(entity: Adopt): EvaluateResponses.Output;
    findById(id: string): AdoptFindById.Output;
    findAll(): AdoptSearch.Output;
}