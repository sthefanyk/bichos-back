import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { ISponsorshipRepository } from "src/@core/domain/contracts";
import { Sponsorship } from "src/@core/domain/entities/sponsorship/sponsorship";

export namespace SponsorshipFindById {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ISponsorshipRepository){}
    
        async execute(input: Input): Output {
            const sponsorship = await this.repo.findById(input.id);

            if (!sponsorship) {
                throw new NotFoundError("Sponsorship not found");
            }

            return sponsorship;
        }
    }
    
    export type Input = {
        id: string
    }
    
    export type Output = Promise<Sponsorship>
}