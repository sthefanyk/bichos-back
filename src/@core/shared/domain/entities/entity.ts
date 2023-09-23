import EntityProps from './entity-props';

export default abstract class Entity<T extends EntityProps> {
  constructor(protected props: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }

  getProps() {
    return this.props;
  }

  toJson() {
    return { ...this.props, id: this.props.id.toString() }
  }  

  toJsonString(): string {
    const propsWithId = { ...this.props, id: this.props.id.toString() };
    return JSON.stringify(propsWithId);
  }
}
