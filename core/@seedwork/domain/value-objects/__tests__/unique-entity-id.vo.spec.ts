import InvalidUuidError from '../../errors/invalid-uuid.error';
import UniqueEntityId from '../unique-entity-id.vo';
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {
  // beforeEach(() => {
  //     jest.clearAllMocks();
  // });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  // beforeEach(() => validateSpy.mockClear());

  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake-id')).toThrow(new InvalidUuidError());

    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const uuid = 'efa14e35-19ba-4af1-9173-5f52a67d41d3';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
