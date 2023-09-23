import Entity from '../../shared/domain/entities/entity';
import PersonalityProps from './personality-props';

export default class Personality extends Entity<PersonalityProps> {
  public update(name: string) {
    this.props.name = name;
    this.props.updated_at = new Date();

    this.props.validate(this.props);
  }

  public activate() {
    this.props.deleted_at = null;
  }

  public deactivate() {
    this.props.deleted_at = new Date();
  }
}
