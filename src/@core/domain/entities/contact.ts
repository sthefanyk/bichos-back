import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { City } from './localization/city';
import ContactProps from './contact-props';

export type ContactAttr = {
  name: string;
  email: string;
  phone: string;
  city: City;
};

export class Contact implements EntityMarker {
  private props: ContactProps;

  constructor(attr: ContactAttr) {
    this.props = new ContactProps(attr);
    this.props.validate(this.props);
  }

  toJson() {
    return { 
			...this.props,
			phone: this.phone,
      city: this.city.toJson().name
		};
  }
 
  get name(): string {
    return this.props.name;
  }

  get email(): string {
		return this.props.email;
	}

	get phone(): string {
		return this.props.phone.phone;
	}

	get city(): City {
		return this.props.city;
	}  
}
