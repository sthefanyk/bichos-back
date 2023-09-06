import { UseCase } from "../../../@seedwork/application/usecase";
import PersonalityRepository from "../../domain/repository/personality.repository";
import { Personality } from "../../domain/entities/personality";
import { PersonalityOutput } from "../dto/personality-output.dto";

export default class DeletePersonalityUseCase implements UseCase<Input, Output>{
    constructor(
        private personalityRepository: PersonalityRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
        const entity = await this.personalityRepository.findById(input.id);
        await this.personalityRepository.delete(entity.id);
    }
}

export type Input = {
    id: string;
};

export type Output = void;
