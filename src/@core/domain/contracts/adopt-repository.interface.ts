import { AdoptFindById, AdoptSearch, AdoptUsecase } from "src/@core/application/use-cases/adopt";
import { Adopt } from "../entities/adopt/adopt";

export interface IAdoptRepository {
    adopt(entity: Adopt): AdoptUsecase.Output;
    findById(id: string): AdoptFindById.Output;
    findAll(): AdoptSearch.Output;
}