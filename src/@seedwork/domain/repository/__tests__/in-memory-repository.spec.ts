import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import UniqueEntityId from "../../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
};

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });

    it("should inserts a new entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it("should throws error when entity not found", async () => {
        expect(repository.findById("fake id")).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID fake id")
        );

        expect(repository.findById(new UniqueEntityId("efa14e35-19ba-4af1-9173-5f52a67d41d3"))).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID efa14e35-19ba-4af1-9173-5f52a67d41d3")
        );
    });

    it("should finds a entity by id", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it("should returns all entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        const entity1 = new StubEntity({ name: "name value2", price: 10 });
        await repository.insert(entity);
        await repository.insert(entity1);

        const entities = await repository.findAll();

        expect(entities).toHaveLength(2);
        expect(entities).toStrictEqual([entity, entity1]);
        expect(entities[0].toJSON()).toStrictEqual(entity.toJSON());
        expect(entities[1].toJSON()).toStrictEqual(entity1.toJSON());
    });

    it("should throws error on update when entity not found", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID "+ entity.id)
        );
    });

    it("should updates an entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        const entityUpdated = new StubEntity({ name: "updated value", price: 10 }, entity.uniqueEntityId);

        await repository.update(entityUpdated);
        
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it("should throws error on delete when entity not found", async () => {
        expect(repository.delete("fake id")).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID fake id")
        );

        expect(repository.delete(new UniqueEntityId("efa14e35-19ba-4af1-9173-5f52a67d41d3"))).rejects.toThrow(
            new NotFoundError("Entity Not Found using ID efa14e35-19ba-4af1-9173-5f52a67d41d3")
        );
    });

    it("should deletes an entity", async () => {
        let entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});
