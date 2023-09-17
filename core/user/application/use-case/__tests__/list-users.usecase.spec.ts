import UserInMemoryRepository from '../../../infra/repository/in-memory/user-in-memory.repository';
import { ListUsersUseCase } from '../list-users.usecase';
import UserRepository from '../../../domain/repository/user.repository';
import { User } from '../../../domain/entities/user';

describe('ListUsersUseCase Unit Tests', () => {
  let useCase: ListUsersUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new ListUsersUseCase.UseCase(repository);
  });

  test('toOutput', async () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    let output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });

    const entity = new User({ name: 'test', email: 'email@example.com', password: 'Password1' });

    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });
  });

  it('should returns output using empty input with users ordered by created_at', async () => {
    const created_at = new Date();
    const items = [
      new User({ name: 'name1', email: 'email@example.com', password: 'Password1' }),
      new User({
        name: 'name2', email: 'email@example.com', password: 'Password1',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new User({
        name: 'name3', email: 'email@example.com', password: 'Password1',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should returns output using pagination, sort and filter', async () => {
    const items = [
      new User({ name: 'aaa', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'AAA', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'AaA', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'bbb', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'ccc', email: 'email@example.com', password: 'Password1' }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });

    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'a',
    });

    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
