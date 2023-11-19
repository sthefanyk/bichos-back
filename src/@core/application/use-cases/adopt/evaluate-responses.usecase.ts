import UseCase from "../usecase";
import { IAdoptRepository } from "src/@core/domain/contracts";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { NotFoundError } from "src/@core/shared/domain/errors/not-found.error";
import { EntityValidationError } from "src/@core/shared/domain/errors/validation.error";

export namespace EvaluateResponses {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IAdoptRepository){}
    
        async execute(input: Input): Output {
            await this.validate(input);

            const adopt = await this.repo.findById(input.id_adopt);
            if (!adopt) throw new NotFoundError("Adopt not found");
            
            input.evaluations.forEach(e => {
                let exits = false;
                adopt.responses.forEach(r => {
                    if (r.id === e.id_response) {
                        exits = true;
                        r.evaluate(+e.evaluation);
                    }
                    return r
                });

                if (!exits) 
                    throw new NotFoundError(`id_response: ${e.id_response} not found`);
            });
            
            await this.repo.evaluateResponses(adopt);
        }

        async validate(input: Input) {
            if(!input.evaluations) throw new RequiredError('evaluations');

            if (!(input.evaluations instanceof Array))
                throw new EntityValidationError('The evaluations is not an array');

            input.evaluations.forEach(e => {
                if(!e.id_response) throw new RequiredError('id_response');
                if(!e.evaluation) throw new RequiredError('evaluation');
            });
        }
    }
    
    export type Input = {
        id_adopt: string;
        evaluations: {
            id_response: string;
            evaluation: number;
        }[];
    }
    
    export type Output = Promise<void>
}