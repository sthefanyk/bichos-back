import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Personality } from "../entities/personality";

export default interface PersonalityRepository
    extends SearchableRepositoryInterface<Personality, any, any> {
        
    }
