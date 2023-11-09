import { DoseProps } from "./dose-props";

export type DoseAttr = {
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
        return { ...this.props };
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