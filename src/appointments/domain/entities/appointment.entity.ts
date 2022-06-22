import { AggregateRoot } from "@nestjs/cqrs";
import { AppointmentStatus } from "../enums/appointment.status";
import { AppointmentType } from "../enums/appointment.type";
import { AppointmentAcceptedEvent } from "../events/appointment-accepted.event";
import { AppointmentCreatedEvent } from "../events/appointment-created.event";
import { AppointmentFinishedEvent } from "../events/appointment-finished.event";
import { AppointmentRejectedEvent } from "../events/appointment-rejected.event";
import { AppointmentDate } from "../value-objects/appointment-date.value";
import { AppointmentId } from "../value-objects/appointment-id.value";

export class Appointment extends AggregateRoot{
    private id: AppointmentId;
    private readonly customerId: number;
    private readonly mechanicId: number;
    private status: AppointmentStatus;
    private type: AppointmentType;
    private date: AppointmentDate;
    private amount: number;


    public constructor(id: AppointmentId, customerId: number, mechanicId: number, status: AppointmentStatus,type: AppointmentType, date: AppointmentDate, amount: number){
        super();
        this.id = id;
        this.customerId = customerId;
        this.mechanicId = mechanicId;
        this.status = status;
        this.type = type;
        this.date = date;
        this.amount = amount;
    }

    //careful with parameters in events, particularly for enums
    public created(){
        const event = new AppointmentCreatedEvent(this.id.getValue(), this.customerId, this.mechanicId, this.getStatus(), this.type, this.date.getDate(), this.amount);
        this.apply(event);
    }

    public accepted(){
        const event = new AppointmentAcceptedEvent(this.id.getValue(), this.customerId, this.mechanicId, this.getStatus(), this.type, this.date.getDate(), this.amount);
        this.apply(event);
    }

    public rejected(){
        const event = new AppointmentRejectedEvent(this.id.getValue(), this.customerId, this.mechanicId, this.getStatus(), this.type, this.date.getDate(), this.amount);
        this.apply(event);
    }

    public finished(){
        const event = new AppointmentFinishedEvent(this.id.getValue(), this.customerId, this.mechanicId, this.getStatus(), this.type, this.date.getDate(), this.amount);
        this.apply(event);
    }

    public getAppointmentId(): AppointmentId{
        return this.id;
    }

    public getCustomerId(): number{
        return this.customerId;
    }

    public getMechanicId(): number{
        return this.mechanicId;
    }

    public getStatus(): AppointmentStatus{
        return this.status;
    }

    public getType(): AppointmentType{
        return this.type;
    }

    public getDate(): AppointmentDate{
        return this.date;
    }

    public getAmount(): number{
        return this.amount;
    }

    public changeStatus(status: AppointmentStatus){
        this.status = status;
    }

    public changeDate(date: AppointmentDate){
        this.date = date;
    }

    public changeAmount(amount: number){
        this.amount = amount;
    }

}