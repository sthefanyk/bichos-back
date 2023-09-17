import NotFoundError from "../../../shared/domain/errors/not-found.error";
import IPersonalityRepository from "../../../domain/contracts/personality-repository.interface";
import UseCase from "../usecase";

export namespace PersonalityDelete {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IPersonalityRepository){}

        async execute(input: Input): Output {
            const personality = await this.repo.findById(input.id);

            if (!personality) {
                throw new NotFoundError("Personality not found");
            }

            personality.deactivate();
            
            return await this.repo.update(personality);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = Promise<void>
}
