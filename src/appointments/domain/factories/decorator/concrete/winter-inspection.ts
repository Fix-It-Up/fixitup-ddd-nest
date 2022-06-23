import { AppointmentDecorator } from "../abstract/appointment-decorator";
import { AppointmentAbstractFactory } from "../../appointment-abstract.factory";

export class WinterInspection extends AppointmentDecorator {
    constructor(appointmentAbstractFactory: AppointmentAbstractFactory) {
        super(appointmentAbstractFactory);
    }

    //winter inspection costs 70
    public calculateCost(): number {
        return this.appointmentAbstractFactory.calculateCost() + 70.00;
    }
}