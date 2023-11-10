import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import Phone from 'src/@core/shared/domain/value-objects/phone.vo';
import { City } from './localization/city';
import ContactProps from './contact-props';

export type ContactAttr = {
	id?: string;
  name: string;
  email: string;
  phone: Phone;
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
			id: this.id,
			phone: this.phone,
      city: this.city.getProps().name
		};
  }

	get id(): string {
    return this.props.id.id;
  }
 
  get name(): string {
    return this.props.name;
  }

  get email(): string {
		return this.props.email;
	}

	get phone(): Phone {
		return this.props.phone;
	}

	get city(): City {
		return this.props.city;
	}  
}
