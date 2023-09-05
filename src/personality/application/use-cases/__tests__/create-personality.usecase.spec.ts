import PersonalityInMemoryRepository from "../../../infra/repository/personality-in-memory.repository";
import CreatePersonalityUseCase from "../create-personality.usecase";

describe("CreatePersonalityUseCase Unit Tests", () => {
    let useCase: CreatePersonalityUseCase;
    let repository: PersonalityInMemoryRepository;

    beforeEach(() => {
        repository = new PersonalityInMemoryRepository();
        useCase = new CreatePersonalityUseCase(repository);
    });

    it("Should be able to create a new personality", async () => {
        const spyInsert = jest.spyOn(repository, "insert");

        let output = await useCase.execute({ name: "test" });
        expect(spyInsert).toHaveBeenCalledTimes(1);

        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: "test",
            is_active: true,
            created_at: repository.items[0].created_at,
        });

        output = await useCase.execute({ name: "test", is_active: false });
        expect(spyInsert).toHaveBeenCalledTimes(2);

        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: "test",
            is_active: false,
            created_at: repository.items[1].created_at,
        });
    });
});