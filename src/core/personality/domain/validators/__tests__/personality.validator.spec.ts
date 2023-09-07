import PersonalityValidatorFactory, {
  PersonalityRules,
  PersonalityValidator,
} from '../personality.validator';

describe('PersonalityValidator Tests', () => {
  let validator: PersonalityValidator;

  beforeEach(() => (validator = PersonalityValidatorFactory.create()));
  test('invalidation cases for name fields', () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be longer than or equal to 3 characters',
        'name must be shorter than or equal to 255 characters',
      ],
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be longer than or equal to 3 characters',
      ],
    });

    expect({ validator, data: { name: 'tt' } }).containsErrorMessages({
      name: ['name must be longer than or equal to 3 characters'],
    });

    expect({
      validator,
      data: { name: 't'.repeat(256) },
    }).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        'name must be a string',
        'name must be longer than or equal to 3 characters',
        'name must be shorter than or equal to 255 characters',
      ],
    });

    // let isValid = validator.validate(null);
    // expect(isValid).toBeFalsy();
    // expect(validator.errors['name']).toStrictEqual([
    //     'name should not be empty',
    //     'name must be a string',
    //     'name must be longer than or equal to 3 characters',
    //     'name must be shorter than or equal to 255 characters'
    // ]);

    // isValid = validator.validate({ name: "" });
    // expect(isValid).toBeFalsy();
    // expect(validator.errors['name']).toStrictEqual([
    //     'name should not be empty',
    //     'name must be longer than or equal to 3 characters'
    // ]);
  });

  test('invalidation cases for is_active fields', () => {
    expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });

    expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });

    expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });

    expect({ validator, data: { is_active: 'true' } }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });

    expect({ validator, data: { is_active: 'false' } }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });
  });

  test('valid cases for name fields', () => {
    const arrange = [
      { name: 'test' },
      { name: 'test', is_active: true },
      { name: 'test', is_active: false },
      { name: 'test', created_at: new Date() },
      { name: 'test', is_active: false, created_at: new Date() },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(validator.validatedData).toStrictEqual(new PersonalityRules(item));
      expect(isValid).toBeTruthy();
    });
  });
});
