import { Appointment } from "../entities/appointment.entity";
import { AppointmentAbstractFactory } from "./appointment-abstract.factory";

export class AppointmentDecorator extends AppointmentAbstractFactory {

    protected appointmentAbstractFactory: AppointmentAbstractFactory; // Component

    constructor(appointmentAbstractFactory: AppointmentAbstractFactory) {
        super();
        this.appointmentAbstractFactory = appointmentAbstractFactory;
    }

    public calculateCost(): number {
        return this.appointmentAbstractFactory.calculateCost();
    }
}