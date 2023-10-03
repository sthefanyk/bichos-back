import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalAdopt } from "../entities/posts/animal-adopt";
import AnimalAdoptModel from "../models/animal-adopt";
import { AnimalMapper } from "./animal.mapper";

export class AnimalAdoptMapper implements MapperMarker {

    static getModel(entity: AnimalAdopt) : AnimalAdoptModel {
        const animal = AnimalMapper.getModel(entity);

        return {
            id: animal.id,
            size: (entity.getProps() as any).size,
            animal,
        };
    }
}