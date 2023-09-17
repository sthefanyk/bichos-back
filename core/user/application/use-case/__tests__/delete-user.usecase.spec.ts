import { User } from '../../../domain/entities/user';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import UserInMemoryRepository from '../../../infra/repository/in-memory/user-in-memory.repository';
import { DeleteUserUseCase } from '../delete-user.usecase';

describe('DeleteUserUseCase Unit Tests', () => {
  let useCase: DeleteUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new DeleteUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );
  });

  it('Should be able to delete a new user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const entity = new User({ name: 'name', email: 'email@example.com', password: 'Password1' });
    repository.items = [entity];

    await useCase.execute({
      id: entity.id,
    });
    expect(repository.items).toHaveLength(0);
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
