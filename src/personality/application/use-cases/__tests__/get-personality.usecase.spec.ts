import { Personality } from "../../../../personality/domain/entities/personality";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import PersonalityInMemoryRepository from "../../../infra/repository/personality-in-memory.repository";
import GetPersonalityUseCase from "../get-personality.usecase";

describe("GetPersonalityUseCase Unit Tests", () => {
    let useCase: GetPersonalityUseCase;
    let repository: PersonalityInMemoryRepository;

    beforeEach(() => {
        repository = new PersonalityInMemoryRepository();
        useCase = new GetPersonalityUseCase(repository);
    });

    it("should throws error when entity not found", async () => {
        expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID fake id")
        );
    });

    it("Should returns a personality", async () => {
        const items = [
            new Personality({ name: "Carinhoso" }),
            new Personality({ name: "Brincalhão", is_active: false }),
        ];
        repository.items = items;

        const spyFindById = jest.spyOn(repository, "findById");

        let output = await useCase.execute({ id: items[0].id });
        expect(spyFindById).toHaveBeenCalledTimes(1);

        expect(output).toStrictEqual({
            id: items[0].id,
            name: "Carinhoso",
            is_active: true,
            created_at: items[0].created_at,
        });

        output = await useCase.execute({ id: items[1].id });

        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: "Brincalhão",
            is_active: false,
            created_at: repository.items[1].created_at,
        });
    });
});
