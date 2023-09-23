import {IPersonRepository} from "../../../domain/contracts/person-repository.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { PersonUpdateInputDto } from "../../DTOs/person.dto";

export namespace PersonUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IPersonRepository){}

        async execute(input: Input): Output {
            const person = await this.repo.findById(input.id);

            if (!person) {
                throw new NotFoundError("User not found");
            }

            try {
                await this.repo.findByEmail(input.email)
            } catch (_) {
                person.update({
                    cpf: input.cpf,
                    date_birth: input.date_birth,
                    fullName: input.fullName,
                    username: input.username,
                    city: input.city,
                    email: input.email,
                    password: input.password,
                    description: input.description
                });
                await person.generatePasswordHash();
                
                return await this.repo.update(person);
            }

            throw new Error(`User using email ${input.email} already exists`);
        }
    }

    export type Input = PersonUpdateInputDto

    export type Output = Promise<void>
}
