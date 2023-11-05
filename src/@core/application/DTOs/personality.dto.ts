export type PersonalityUpdateInputDto = {
    id: string;
    name: string;
}

export type PersonalityOutputDto = {
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}