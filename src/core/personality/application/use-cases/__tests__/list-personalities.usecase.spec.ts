import PersonalityInMemoryRepository from '../../../infra/repository/personality-in-memory.repository';
import ListPersonalitiesUseCase from '../list-personalities.usecase';
import PersonalityRepository from '../../../../personality/domain/repository/personality.repository';
import { Personality } from '../../../../personality/domain/entities/personality';

describe('ListPersonalitiesUseCase Unit Tests', () => {
  let useCase: ListPersonalitiesUseCase;
  let repository: PersonalityInMemoryRepository;

  beforeEach(() => {
    repository = new PersonalityInMemoryRepository();
    useCase = new ListPersonalitiesUseCase(repository);
  });

  test('toOutput', async () => {
    let result = new PersonalityRepository.SearchResult({
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

    const entity = new Personality({ name: 'test' });

    result = new PersonalityRepository.SearchResult({
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

  it('should returns output using empty input with personalities ordered by created_at', async () => {
    const created_at = new Date();
    const items = [
      new Personality({ name: 'test1' }),
      new Personality({
        name: 'test2',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Personality({
        name: 'test3',
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
    const created_at = new Date();
    const items = [
      new Personality({ name: 'aaa' }),
      new Personality({ name: 'AAA' }),
      new Personality({ name: 'AaA' }),
      new Personality({ name: 'bbb' }),
      new Personality({ name: 'ccc' }),
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
