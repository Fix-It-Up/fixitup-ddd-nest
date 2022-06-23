import { Appointment } from "../../../entities/appointment.entity";
import { AppointmentStatus } from "../../../enums/appointment.status";
import { AppointmentId } from "../../../value-objects/appointment-id.value";
import { AppointmentAbstractFactory } from "../../appointment-abstract.factory";
import { CreateFromParams } from "../../params/create-from.params";

export class AppointmentPremiumFactory extends AppointmentAbstractFactory{
    public calculateCost(): number {
        return 70.00;
    }
}