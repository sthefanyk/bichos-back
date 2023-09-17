import { User } from '../../../../user/domain/entities/user';
import UserInMemoryRepository from './user-in-memory.repository';

describe('UserInMemoryRepository Tests', () => {
  let repository: UserInMemoryRepository;

  beforeEach(() => (repository = new UserInMemoryRepository()));

  it('should no filter items when filter object is null', async () => {
    const items = [new User({ name: 'name', email: 'email@example.com', password: 'Password1'})];

    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it('should filter items using filter parameter', async () => {
    const items = [
      new User({ name: 'name', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'NAME', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'fake', email: 'email@example.com', password: 'Password1' }),
    ];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, 'NAME');
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('should sort by created_at when sort param is null', async () => {
    const created_at = new Date();
    const items = [
      new User({ name: 'test', email: 'email@example.com', password: 'Password1', created_at: created_at }),
      new User({
        name: 'TEST', email: 'email@example.com', password: 'Password1',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new User({
        name: 'fake', email: 'email@example.com', password: 'Password1',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    const itemsSorted = await repository['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort by name', async () => {
    const items = [
      new User({ name: 'carol', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'beatriz', email: 'email@example.com', password: 'Password1' }),
      new User({ name: 'amanda', email: 'email@example.com', password: 'Password1' }),
    ];

    let itemsSorted = await repository['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository['applySort'](items, 'name', 'desc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
