import { Personality } from '../../../../personality/domain/entities/personality';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import PersonalityInMemoryRepository from '../../../infra/repository/in-memory/personality-in-memory.repository';
import UpdatePersonalityUseCase from '../update-personality.usecase';

describe('UpdatePersonalityUseCase Unit Tests', () => {
  let useCase: UpdatePersonalityUseCase;
  let repository: PersonalityInMemoryRepository;

  beforeEach(() => {
    repository = new PersonalityInMemoryRepository();
    useCase = new UpdatePersonalityUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() =>
      useCase.execute({ id: 'fake id', name: 'fake' }),
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('Should be able to update a new personality', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const entity = new Personality({ name: 'Carinhos' });
    repository.items = [entity];

    const arrange = [
      {
        entity: { id: entity.id, name: 'Carinhoso' },
        expected: {
          id: entity.id,
          name: 'Carinhoso',
          is_active: true,
          created_at: entity.created_at,
        },
        spy: 1,
      },
      {
        entity: {
          id: entity.id,
          name: 'Carinhoso',
          is_active: false,
        },
        expected: {
          id: entity.id,
          name: 'Carinhoso',
          is_active: false,
          created_at: entity.created_at,
        },
        spy: 2,
      },
      {
        entity: {
          id: entity.id,
          name: 'Bricalhão',
          is_active: true,
        },
        expected: {
          id: entity.id,
          name: 'Bricalhão',
          is_active: true,
          created_at: entity.created_at,
        },
        spy: 3,
      },
    ];

    for (const { entity, expected, spy } of arrange) {
      const output = await useCase.execute(entity);
      expect(spyUpdate).toHaveBeenCalledTimes(spy);

      expect(output).toStrictEqual(expected);
    }
  });
});
