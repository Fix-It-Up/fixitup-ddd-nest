import { Appointment } from "../entities/appointment.entity";
import { AppointmentStatus } from "../enums/appointment.status";
import { AppointmentId } from "../value-objects/appointment-id.value";
import { AppointmentAbstractFactory } from "./appointment-abstract.factory";
import { CreateFromParams } from "./params/create-from.params";

export class AppointmentBasicFactory extends AppointmentAbstractFactory{
    public calculateCost(): number {
        return 50;
    }
    // public createFrom(params: CreateFromParams): Appointment {
    //     return new Appointment(
    //         AppointmentId.create(0),
    //         params.customerId,
    //         params.mechanicId,
    //         AppointmentStatus.REQUESTED,
    //         params.type,
    //         params.date,
    //         //basic amount:50
    //         50
    //     );
    // }  
}