import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { Personality } from "../../domain/entities/personality";
import PersonalityRepository from "../../domain/repository/personality.repository";

export default class PersonalityInMemoryRepository
    extends InMemorySearchableRepository<Personality>
    implements PersonalityRepository {
    protected applyFilter(items: Personality[], filter: string): Promise<Personality[]> {
        throw new Error("Method not implemented.");
    }
}
