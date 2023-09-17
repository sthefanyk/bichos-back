import { User } from '../../../domain/entities/user';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import UserInMemoryRepository from '../../../infra/repository/in-memory/user-in-memory.repository';
import { UpdateUserUseCase } from '../update-user.usecase';

describe('UpdateUserUseCase Unit Tests', () => {
  let useCase: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new UpdateUserUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() =>
      useCase.execute({
        id: 'fake id',
        name: 'fake',
        email: 'email@example.com',
        password: 'Password1',
      }),
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('Should be able to update a new user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const entity = new User({
      name: 'fake',
      email: 'email@example.com',
      password: 'Password1',
    });
    repository.items = [entity];

    const arrange = [
      {
        entity: {
          id: entity.id,
          name: 'name',
          email: 'email@example.com',
          password: 'Password1',
        },
        expected: {
          id: entity.id,
          name: 'name',
          email: 'email@example.com',
          password: 'Password1',
          is_active: true,
          created_at: entity.created_at,
        },
        spy: 1,
      },
      {
        entity: {
          id: entity.id,
          name: 'name',
          email: 'email@example.com',
          password: 'Password1',
          is_active: false,
        },
        expected: {
          id: entity.id,
          name: 'name',
          email: 'email@example.com',
          password: 'Password1',
          is_active: false,
          created_at: entity.created_at,
        },
        spy: 2,
      },
      {
        entity: {
          id: entity.id,
          name: 'test',
          email: 'email@example.com',
          password: 'Password1',
          is_active: true,
        },
        expected: {
          id: entity.id,
          name: 'test',
          email: 'email@example.com',
          password: 'Password1',
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
