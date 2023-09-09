import { User } from '../../../../user/domain/entities/user';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import UserInMemoryRepository from '../../../infra/repository/in-memory/user-in-memory.repository';
import { GetUserUseCase } from '../get-user.usecase';

describe('GetUserUseCase Unit Tests', () => {
  let useCase: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );
  });

  it('Should returns a user', async () => {
    const items = [
      new User({ name: 'name', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'name2', email: 'email@example.com', password: 'Password1', is_active: false }),
    ];
    repository.items = items;

    const spyFindById = jest.spyOn(repository, 'findById');

    let output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);

    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'name', 
      email: 'email@example.com', 
      password: 'Password1',
      is_active: true,
      created_at: items[0].created_at,
    });

    output = await useCase.execute({ id: items[1].id });

    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'name2', 
      email: 'email@example.com', 
      password: 'Password1',
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
