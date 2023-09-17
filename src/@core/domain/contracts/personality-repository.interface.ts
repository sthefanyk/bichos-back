import Personality from "../entities/personality";
import PersonalityProps from "../entities/personality-props";
import IRepository from "./repository.interface";

export default interface IPersonalityRepository extends IRepository<PersonalityProps, Personality>{}