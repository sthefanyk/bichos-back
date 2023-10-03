import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { AnimalSponsorship } from "../entities/posts/animal-sponsorship";
import AnimalSponsorshipModel from "../models/animal-sponsorship";
import { AnimalMapper } from "./animal.mapper";

export class AnimalSponsorshipMapper implements MapperMarker {

    static getModel(entity: AnimalSponsorship) : AnimalSponsorshipModel {
        const animal = AnimalMapper.getModel(entity);

        return {
            id: animal.id,
            accompany: (entity.getProps() as any).accompany,
            reason_request: (entity.getProps() as any).reason_request,
            animal,
        };
    }
}