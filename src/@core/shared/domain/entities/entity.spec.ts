import Entity from './entity';
import { validate as uuidValidate } from 'uuid';
import EntityProps from './entity-props';
import UUID from '../value-objects/uuid.vo';

class StubEntityProps extends EntityProps {}
class StubEntityProps2 extends EntityProps {
  constructor(
    public name: string,
    id?: string,
    a?: Date,
    b?: Date,
    c?: Date,
  ) {
    super(id, a, b, c);
  }
}

class StubEntity extends Entity<StubEntityProps> {}
class StubEntity2 extends Entity<StubEntityProps2> {}

describe('Entity Unit Tests', () => {
  it('should set properties an identifier', () => {
    const props = new StubEntityProps();
    const entity = new StubEntity(props);

    expect(entity.get('id')).not.toBeNull();
    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(uuidValidate(entity.get('id').toString())).toBeTruthy();
    expect(entity.get('created_at')).not.toBeNull();
    expect(entity.get('updated_at')).toBeNull();
    expect(entity.get('deleted_at')).toBeNull();
  });

  it('should set properties an identifier', () => {
    const props = new StubEntityProps2('name user');
    const entity = new StubEntity2(props);

    expect(entity.get('name')).not.toBeNull();
    expect(entity.get('name')).toBe('name user');

    expect(entity.get('id')).not.toBeNull();
    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(uuidValidate(entity.get('id').toString())).toBeTruthy();
    expect(entity.get('created_at')).not.toBeNull();
    expect(entity.get('updated_at')).toBeNull();
    expect(entity.get('deleted_at')).toBeNull();
  });

  it('should accept a valid uuid', () => {
    const props = new StubEntityProps();
    const entity = new StubEntity(props);

    expect(entity.getProps()).toBe(props);
  });

  it('should accept a valid uuid', () => {
    const props = new StubEntityProps2('name user');
    const entity = new StubEntity2(props);

    expect(entity.getProps().name).toBe('name user');
    expect(entity.getProps()).toBe(props);
  });

  it('should getter props', () => {
    const uuid = new UUID();
    const entity = new StubEntity2(
      new StubEntityProps2('name', uuid.toString()),
    );

    expect(entity.get('id')).toBeInstanceOf(UUID);
    expect(entity.get('id').toString()).toBe(uuid.value);
  });

  // it('should convert a entity to a JavaScript Object', () => {
  //   const arrange = { prop1: 'foo', prop2: 10 };
  //   const uniqueEntityId = new UniqueEntityId();
  //   const entity = new StubEntity(arrange, uniqueEntityId);

  //   expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange });
  // });
});
