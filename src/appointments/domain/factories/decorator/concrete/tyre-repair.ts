import { AppointmentDecorator } from "../abstract/appointment-decorator";
import { AppointmentAbstractFactory } from "../../appointment-abstract.factory";

export class TyreRepair extends AppointmentDecorator {
    constructor(appointmentAbstractFactory: AppointmentAbstractFactory) {
        super(appointmentAbstractFactory);
    }

    //tyre repair costs 30
    public calculateCost(): number {
        return this.appointmentAbstractFactory.calculateCost() + 30;
    }
}