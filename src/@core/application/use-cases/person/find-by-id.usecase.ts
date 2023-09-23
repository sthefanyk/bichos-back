import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import {IPersonRepository} from "../../../domain/contracts/person-repository.interface";
import Person from "../../../domain/entities/users/person";

export namespace PersonFindById {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonRepository){}
    
        async execute(input: Input): Output {
            const user = await this.repo.findById(input.id);

            if (!user) {
                throw new NotFoundError("Person not found");
            }

            return user;
        }
    }
    
    export type Input = {
        id: string
    }
    
    export type Output = Promise<Person>
}


