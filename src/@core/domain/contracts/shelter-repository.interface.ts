import Shelter from "../entities/users/shelter";
import IUserRepository from "./user-repository.interface";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import { ShelterCreate, ShelterFindById, ShelterUpdate } from "src/@core/application/use-cases/shelter";
import { ShelterFindByCpf } from "src/@core/application/use-cases/shelter/find-by-cpf.usecase";
import { ShelterFindByNameShelter } from "src/@core/application/use-cases/shelter/find-by-name-shelter.usecase";

export interface IShelterRepository extends IUserRepository{
    insert(entity: Shelter): ShelterCreate.Output;
    findById(id: string): ShelterFindById.Output;
    findByNameShelter(name_shelter: string): ShelterFindByNameShelter.Output
    findAll(): Promise<Shelter[]>;
    update(entity: Shelter): ShelterUpdate.Output;
    delete(id: string): Promise<void>;
    getActiveRecords(): Promise<Shelter[]>;
    getInactiveRecords(): Promise<Shelter[]>;
    findByCpf(cpf: CPF): ShelterFindByCpf.Output;
}