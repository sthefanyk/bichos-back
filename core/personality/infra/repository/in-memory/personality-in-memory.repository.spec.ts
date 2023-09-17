import { Personality } from '../../../../personality/domain/entities/personality';
import PersonalityInMemoryRepository from './personality-in-memory.repository';

describe('PersonalityInMemoryRepository Tests', () => {
  let repository: PersonalityInMemoryRepository;

  beforeEach(() => (repository = new PersonalityInMemoryRepository()));

  it('should no filter items when filter object is null', async () => {
    const items = [new Personality({ name: 'Agitado' })];

    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it('should filter items using filter parameter', async () => {
    const items = [
      new Personality({ name: 'agitado' }),
      new Personality({ name: 'AGITADO' }),
      new Personality({ name: 'fake' }),
    ];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, 'AGITADO');
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('should sort by created_at when sort param is null', async () => {
    const created_at = new Date();
    const items = [
      new Personality({ name: 'test', created_at: created_at }),
      new Personality({
        name: 'TEST',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Personality({
        name: 'fake',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    const itemsSorted = await repository['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort by name', async () => {
    const items = [
      new Personality({ name: 'carinhoso' }),
      new Personality({ name: 'bobão' }),
      new Personality({ name: 'amigavel' }),
    ];

    let itemsSorted = await repository['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository['applySort'](items, 'name', 'desc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
