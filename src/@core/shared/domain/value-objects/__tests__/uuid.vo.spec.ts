import InvalidUuidError from '../../errors/invalid-uuid.error';
import UUID from '../uuid.vo';
import { validate as uuidValidate } from 'uuid';

describe('Test Value Object UUID', () => {
  const validateSpy = jest.spyOn(UUID.prototype as any, 'validate');

  it('should throw error when uuid is invalid', () => {
    expect(() => new UUID('id fake')).toThrow(new InvalidUuidError());

    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const uuid = 'efa14e35-19ba-4af1-9173-5f52a67d41d3';
    const vo = new UUID(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const vo = new UUID();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
