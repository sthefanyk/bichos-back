export type BreedUpdateInputDto = {
    id: string;
    name: string;
}

export type BreedOutputDto = {
    name: string;
    specie: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}