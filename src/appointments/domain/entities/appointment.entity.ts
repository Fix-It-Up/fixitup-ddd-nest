import { AggregateRoot } from "@nestjs/cqrs";
import { DateTime } from "src/common/domain/value-objects/date-time.value";
import { AppointmentStatus } from "../enums/appointment.status";
import { AppointmentType } from "../enums/appointment.type";
import { AppointmentDate } from "../value-objects/appointment-date.value";
import { AppointmentId } from "../value-objects/appointment-id.value";

export class Appointment extends AggregateRoot{
    private id: AppointmentId;
    private readonly customerId: number;
    private readonly mechanicId: number;
    private state: AppointmentStatus;
    private type: AppointmentType;
    private date: AppointmentDate;
    private amount: number;
}