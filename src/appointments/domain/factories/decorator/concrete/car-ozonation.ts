import { AppointmentDecorator } from "../abstract/appointment-decorator";
import { AppointmentAbstractFactory } from "../../appointment-abstract.factory";

export class CarOzonation extends AppointmentDecorator {
    constructor(appointmentAbstractFactory: AppointmentAbstractFactory) {
        super(appointmentAbstractFactory);
    }

    //car ozonation costs 50
    public calculateCost(): number {
        return this.appointmentAbstractFactory.calculateCost() + 50.00;
    }
}