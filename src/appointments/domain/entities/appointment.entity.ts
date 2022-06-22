import { AggregateRoot } from "@nestjs/cqrs";
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


    public constructor(id: AppointmentId, customerId: number, mechanicId: number, state: AppointmentStatus,type: AppointmentType, date: AppointmentDate, amount: number){
        super();
        this.id = id;
        this.customerId = customerId;
        this.mechanicId = mechanicId;
        this.state = state;
        this.type = type;
        this.date = date;
        this.amount = amount;
    }

}