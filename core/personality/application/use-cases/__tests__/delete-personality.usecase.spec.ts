import { Personality } from '../../../domain/entities/personality';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import PersonalityInMemoryRepository from '../../../infra/repository/in-memory/personality-in-memory.repository';
import { DeletePersonalityUseCase } from '../delete-personality.usecase';

describe('DeletePersonalityUseCase Unit Tests', () => {
  let useCase: DeletePersonalityUseCase.UseCase;
  let repository: PersonalityInMemoryRepository;

  beforeEach(() => {
    repository = new PersonalityInMemoryRepository();
    useCase = new DeletePersonalityUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );
  });

  it('Should be able to delete a new personality', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const entity = new Personality({ name: 'Carinhoso' });
    repository.items = [entity];

    await useCase.execute({
      id: entity.id,
    });
    expect(repository.items).toHaveLength(0);
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
