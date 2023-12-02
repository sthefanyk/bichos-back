import ValueObject from './value-objects';

export default class Reputation extends ValueObject<{
  count: number;
  sum: number;
  average: number;
}> {
  constructor(
    private readonly reputation: {
      count: number;
      sum: number;
      average: number;
    },
  ) {
    super(reputation);
    this.validate();
  }

  private validate() {
    const av = Reputation.calculateAverageReputation(
      this.value.sum,
      this.value.count,
    );
    if (av > 5) {
      throw new Error('Invalid Reputation');
    }
  }

  static calculateAverageReputation(sum: number, count: number) {
    return sum / count;
  }
}
