import UUID from '../value-objects/uuid.vo';
import EntityProps from './entity-props';

describe('Test EntityProps', () => {
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

  test('Create props without params', () => {
    const props = new StubEntityProps();
    expect(props.id).toBeInstanceOf(UUID);
    expect(props.id).not.toBeNull();
    expect(props.created_at).not.toBeNull();
    expect(props.updated_at).toBeNull();
    expect(props.deleted_at).toBeNull();
  });

  test('Create props without params', () => {
    const props = new StubEntityProps2('name');
    expect(props.name).toBe('name');
    expect(props.id).toBeInstanceOf(UUID);
    expect(props.id).not.toBeNull();
    expect(props.created_at).not.toBeNull();
    expect(props.updated_at).toBeNull();
    expect(props.deleted_at).toBeNull();
  });

  test('Create props with params', () => {
    const created_at = new Date();
    const updated_at = new Date('2023-09-14');
    const deleted_at = new Date('2023-09-16');

    const props = new StubEntityProps(
      'bd2c0d5e-2f3d-4645-b0cd-01638b466e92',
      created_at,
      updated_at,
      deleted_at,
    );

    expect(props.id.getUuid()).toBe('bd2c0d5e-2f3d-4645-b0cd-01638b466e92');
    expect(props.created_at).toBe(created_at);
    expect(props.updated_at).toBe(updated_at);
    expect(props.deleted_at).toBe(deleted_at);
  });

  test('Create props with params', () => {
    const created_at = new Date();
    const updated_at = new Date('2023-09-14');
    const deleted_at = new Date('2023-09-16');

    const props = new StubEntityProps2(
      'name',
      'bd2c0d5e-2f3d-4645-b0cd-01638b466e92',
      created_at,
      updated_at,
      deleted_at,
    );

    expect(props.name).toBe('name');
    expect(props.id.getUuid()).toBe('bd2c0d5e-2f3d-4645-b0cd-01638b466e92');
    expect(props.created_at).toBe(created_at);
    expect(props.updated_at).toBe(updated_at);
    expect(props.deleted_at).toBe(deleted_at);
  });
});
