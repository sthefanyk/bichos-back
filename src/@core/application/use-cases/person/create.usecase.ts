import IPersonRepository from "../../../domain/contracts/person-repository.interface";
import UseCase from "../usecase";
import Person from "../../../domain/entities/users/person";
import { PersonInputDto } from "../../DTOs/person.dto";

export namespace PersonCreate {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonRepository){}

        async execute(input: Input): Output {
            try {
                await this.repo.findByEmail(input.email)
            } catch (_) {
                const user = new Person({
                    cpf: input.cpf,
                    date_birth: input.date_birth,
                }, {
                    fullName: input.fullName,
                    username: input.username,
                    email: input.email,
                    password: input.password,
                    city: input.city,
                    role: input.role,
                    description: input.description,
                    id: input.id,
                    created_at: input.created_at,
                    updated_at: input.updated_at,
                    deleted_at: input.deleted_at,
                });
                await user.generatePasswordHash();
                
                return await this.repo.insert(user);
            }

            throw new Error(`Person using email ${input.email} already exists`);
        }
    }

    export type Input = PersonInputDto

    export type Output = Promise<string>

    
}


