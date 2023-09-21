import EntityProps from '../../../shared/domain/entities/entity-props';
import Entity from '../../../shared/domain/entities/entity';
import { SearchService } from './search.service';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';
import { EntityMarker } from '../../../shared/domain/markers/entity.marker';

class StubEntityProps extends EntityProps {
  constructor(
    public name: string,
    public price: number,
    id?: string,
    a?: Date,
    b?: Date,
    c?: Date,
  ) {
    super(id, a, b, c);
  }
}
class StubEntity extends Entity<StubEntityProps> implements EntityMarker {}

class StubSearchable extends SearchService<StubEntity> {
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(
      (i) =>
        i.getProps().name.toLowerCase().includes(filter.toLowerCase()) ||
        i.getProps().price.toString() === filter,
    );
  }
}

describe('SearchService Unit Test', () => {
  let service: StubSearchable;

  beforeEach(() => {
    service = new StubSearchable([], ['name']);
  });

  describe('applyFilter method', () => {
    it('should no filter items when filter param is null', async () => {
      const items = [new StubEntity(new StubEntityProps('name value', 5))];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const itemsFiltered = await service['applyFilter'](items, null);

      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter using filter param', async () => {
      const items = [
        new StubEntity(new StubEntityProps('test', 5)),
        new StubEntity(new StubEntityProps('TEST', 5)),
        new StubEntity(new StubEntityProps('fake', 0)),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let itemsFiltered = await service['applyFilter'](items, 'TEST');

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await service['applyFilter'](items, '5');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await service['applyFilter'](items, 'no-filter');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort method', () => {
    it('should no sort items', async () => {
      const items = [
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('b', 5)),
      ];

      let itemsSorted = await service['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await service['applySort'](items, 'price', 'asc');
      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity(new StubEntityProps('b', 5)),
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('c', 5)),
      ];

      let itemsSorted = await service['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await service['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });
  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('b', 5)),
        new StubEntity(new StubEntityProps('c', 5)),
        new StubEntity(new StubEntityProps('d', 5)),
        new StubEntity(new StubEntityProps('e', 5)),
      ];

      let itemsPaginated = await service['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await service['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await service['applyPaginate'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await service['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe('search method', () => {
    it('should apply only paginate when other params are null', async () => {
      const entity = new StubEntity(new StubEntityProps('a', 5));
      const items = Array(16).fill(entity);
      service = new StubSearchable(items, ['name']);

      const result = await service.search(new SearchParams());
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        }),
      );
    });

    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity(new StubEntityProps('test', 5)),
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('TEST', 5)),
        new StubEntity(new StubEntityProps('TeSt', 5)),
      ];
      service = new StubSearchable(items, ['name']);

      let result = await service.search(
        new SearchParams({ page: 1, per_page: 2, filter: 'TEST' }),
      );
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: 'TEST',
        }),
      );

      result = await service.search(
        new SearchParams({ page: 2, per_page: 2, filter: 'TEST' }),
      );
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: 'TEST',
        }),
      );
    });

    it('should apply paginate and sort', async () => {
      const items = [
        new StubEntity(new StubEntityProps('b', 5)),
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('d', 5)),
        new StubEntity(new StubEntityProps('e', 5)),
        new StubEntity(new StubEntityProps('c', 5)),
      ];

      service = new StubSearchable(items, ['name']);

      const arrange = [
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
          }),
          search_result: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: null,
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
          }),
          search_result: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: null,
          }),
        },
        {
          search_params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
          }),
          search_result: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: null,
          }),
        },
        {
          search_params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
          }),
          search_result: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: null,
          }),
        },
      ];

      for (const i of arrange) {
        const result = await service.search(i.search_params);
        expect(result).toStrictEqual(i.search_result);
      }
    });

    it('should search using filter, sort and paginate', async () => {
      const items = [
        new StubEntity(new StubEntityProps('test', 5)),
        new StubEntity(new StubEntityProps('a', 5)),
        new StubEntity(new StubEntityProps('TEST', 5)),
        new StubEntity(new StubEntityProps('e', 5)),
        new StubEntity(new StubEntityProps('TeSt', 5)),
      ];
      service = new StubSearchable(items, ['name']);

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          result: new SearchResult({
            items: [items[2], items[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'TEST',
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          result: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'TEST',
          }),
        },
      ];

      for (const i of arrange) {
        const result = await service.search(i.params);
        expect(result).toStrictEqual(i.result);
      }
    });
  });
});
