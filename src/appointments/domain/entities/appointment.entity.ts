import { AggregateRoot } from "@nestjs/cqrs";
import { AppointmentStatus } from "../enums/appointment.status";
import { AppointmentType } from "../enums/appointment.type";
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

    public changeStatus(status: AppointmentStatus){
        this.status = status;
    }

    public changeDate(date: AppointmentDate){
        this.date = date;
    }

}