import { PersonCreate, PersonFindById, PersonUpdate } from "src/@core/application/use-cases/person";
import Person from "../entities/users/person";
import { IUserRepository } from "./user-repository.interface";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import { PersonFindByCpf } from "src/@core/application/use-cases/person/find-by-cpf.usecase";

export interface IPersonRepository extends IUserRepository{
    insert(entity: Person): PersonCreate.Output;
    findById(id: string): PersonFindById.Output;
    findAll(): Promise<Person[]>;
    update(entity: Person): PersonUpdate.Output;
    getActiveRecords(): Promise<Person[]>;
    getInactiveRecords(): Promise<Person[]>;
    findByCpf(cpf: CPF): PersonFindByCpf.Output;
}