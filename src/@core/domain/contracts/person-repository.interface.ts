import Person from "../entities/users/person";
import IUserRepository from "./user-repository.interface";

export default interface IPersonRepository extends IUserRepository<Person>{

}