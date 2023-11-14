import NGO from "../entities/users/ngo";
import { IUserRepository } from "./user-repository.interface";
import CNPJ from "src/@core/shared/domain/value-objects/cnpj.vo";
import { NGOCreate, NGOFindByCnpj, NGOFindById, NGOUpdate } from "src/@core/application/use-cases/ngo";

export interface INGORepository extends IUserRepository{
    insert(entity: NGO): NGOCreate.Output;
    findById(id: string): NGOFindById.Output;
    findAll(): Promise<NGO[]>;
    update(entity: NGO): NGOUpdate.Output;
    delete(id: string): Promise<void>;
    getActiveRecords(): Promise<NGO[]>;
    getInactiveRecords(): Promise<NGO[]>;
    findByCnpj(cnpj: CNPJ): NGOFindByCnpj.Output;
}