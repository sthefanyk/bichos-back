import { UseCase } from "../../../@seedwork/application/usecase";
import PersonalityRepository from "../../domain/repository/personality.repository";
import { PersonalityOutput } from "../dto/personality-output.dto";

export default class GetPersonalityUseCase implements UseCase<Input, Output>{
    constructor(
        private personalityRepository: PersonalityRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
        const entity = await this.personalityRepository.findById(input.id);

        return {
            id: entity.id,
            name: entity.name,
            is_active: entity.is_active,
            created_at: entity.created_at,
        };
    }
}

export type Input = {
    id: string;
};

export type Output = PersonalityOutput;