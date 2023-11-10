import { DoseProps } from "./dose-props";

export type DoseAttr = {
    id?: string;
    number_dose: number;
    application_date: Date;
    applied: boolean;
}

export class Dose {
    private props: DoseProps

    constructor(attr: DoseAttr){
        this.props = new DoseProps(attr);
    }

    toJson() {
        return { ...this.props, id: this.id };
    }

    get id(): string {
        return this.props.id.id;
    }

    get number_dose(): number {
        return this.props.number_dose;
    }

    get application_date(): Date {
        return this.props.application_date;
    }

    get applied(): boolean {
        return this.props.applied;
    }
}