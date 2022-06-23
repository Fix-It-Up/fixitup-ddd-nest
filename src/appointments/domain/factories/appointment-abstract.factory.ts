import { Appointment } from "../entities/appointment.entity";
import { CreateFromParams } from "./params/create-from.params";
import { AppointmentStatus } from "../enums/appointment.status";
import { AppointmentId } from "../value-objects/appointment-id.value";

export abstract class AppointmentAbstractFactory{
    public static createFrom(params: CreateFromParams): Appointment {
        return new Appointment(
            AppointmentId.create(0),
            params.customerId,
            params.mechanicId,
            AppointmentStatus.REQUESTED,
            params.type,
            params.date,
            params.amount
        );
    }  
    public abstract calculateCost(): number;
}