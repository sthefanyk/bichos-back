import UserInMemoryRepository from '../../../infra/repository/in-memory/user-in-memory.repository';
import { CreateUserUseCase } from '../create-user.usecase';

describe('CreateUserUseCase Unit Tests', () => {
  let useCase: CreateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase.UseCase(repository);
  });

  it('Should be able to create a new user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    let output = await useCase.execute({ name: 'name', email: 'email@example.com', password: 'Password1' });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'name', 
      email: 'email@example.com', 
      password: 'Password1',
      is_active: true,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({ name: 'name', email: 'email@example.com', password: 'Password1', is_active: false });
    expect(spyInsert).toHaveBeenCalledTimes(2);

    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'name', 
      email: 'email@example.com', 
      password: 'Password1',
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
