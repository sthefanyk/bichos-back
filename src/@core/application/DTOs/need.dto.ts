export type NeedUpdateInputDto = {
    id: string;
    name: string;
}

export type NeedOutputDto = {
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}