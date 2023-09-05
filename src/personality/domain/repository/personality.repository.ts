import {
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
    SearchableRepositoryInterface,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Personality } from "../entities/personality";

export namespace PersonalityRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {}

    export class SearchResult extends DefaultSearchResult<
        Personality,
        Filter
    > {}

    export interface Repository
        extends SearchableRepositoryInterface<
            Personality,
            Filter,
            SearchParams,
            SearchResult
        > {}
}

export default PersonalityRepository;
