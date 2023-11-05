import { 
    BreedCreate, 
    BreedFindById, 
    BreedUpdate,
    BreedActivate,
    BreedInactivate,
    BreedSearch,
    BreedGetActiveRecords,
    BreedGetInactiveRecords,
    BreedFindByName,
    BreedFindBySpecie,
} from "src/@core/application/use-cases/breed";
import { Breed } from "../entities/breed";
import { Species } from "src/@core/shared/domain/enums/species.enum";

export interface IBreedRepository {
    insert(entity: Breed): BreedCreate.Output;
    update(entity: Breed): BreedUpdate.Output;
    activate(entity: Breed): BreedActivate.Output;
    inactivate(entity: Breed): BreedInactivate.Output;
    findById(id: string): BreedFindById.Output;
    findByName(name: string): BreedFindByName.Output;
    findBySpecie(specie: Species): BreedFindBySpecie.Output;
    findAll(): BreedSearch.Output;
    getActiveRecords(): BreedGetActiveRecords.Output;
    getInactiveRecords(): BreedGetInactiveRecords.Output;
}