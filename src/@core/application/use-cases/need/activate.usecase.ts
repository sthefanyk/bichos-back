import { INeedRepository } from "src/@core/domain/contracts";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { Need } from "src/@core/domain/entities/need";

export namespace NeedActivate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: INeedRepository) {}

        async execute(input: Input): Output {
            const need = await this.repo.findById(input.id);
            if (!need) throw new NotFoundError("Need not found");

            need.activate();
            return await this.repo.activate(need);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = Promise<Need>
}
