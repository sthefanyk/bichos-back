import { IsObject, IsString, Length } from "class-validator";
import EntityProps from "../../../shared/domain/entities/entity-props";
import { CityAttr } from "./city";
import { State } from "./state";

export class CityProps extends EntityProps {

    @IsString()
    @Length(2, 45)
    name: string;

    @IsObject()
    state: State;

    constructor(props: CityAttr){
        super(props.id, props.created_at, props.updated_at, props.deleted_at);
        this.name = props.name.toUpperCase();
        this.state = props.state;

        this.validate(this);
    }
}
