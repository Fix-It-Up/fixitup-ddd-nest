import { AppointmentStatus } from "src/appointments/domain/enums/appointment.status";
import { AppointmentType } from "src/appointments/domain/enums/appointment.type";
import { MechanicAddress } from "src/mechanics/domain/value-objects/mechanic-address.value.dto";
import { MechanicDescription } from "src/mechanics/domain/value-objects/mechanic-description.value";
import { AppointmentDate } from "../../value-objects/appointment-date.value";


export interface CreateFromParams{
    customerId: number;
    mechanicId: number;
    status: AppointmentStatus;
    type: AppointmentType;
    date: AppointmentDate;
    amount: number;
}