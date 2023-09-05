import { UseCase } from "../../../@seedwork/application/usecase";
import PersonalityRepository from "../../domain/repository/personality.repository";
import { Personality } from "../../domain/entities/personality";
import { PersonalityOutput } from "../dto/personality-output.dto";

export default class CreatePersonalityUseCase implements UseCase<Input, Output>{
    constructor(
        private personalityRepository: PersonalityRepository.Repository
    ) {}

    async execute(input: Input): Promise<PersonalityOutput> {
        const entity = new Personality(input);
        await this.personalityRepository.insert(entity);

        return {
            id: entity.id,
            name: entity.name,
            is_active: entity.is_active,
            created_at: entity.created_at,
        };
    }
}

export type Input = {
    name: string;
    is_active?: boolean;
};

export type Output = PersonalityOutput;
