import { AppointmentStatus } from "src/appointments/domain/enums/appointment.status";
import { AppointmentType } from "src/appointments/domain/enums/appointment.type";
import { Column, Entity } from "typeorm";
import { AppointmentIdTypeORM } from "./appointment-id.typeorm";

@Entity('appointments')
export class AppointmentTypeORM{
    @Column((type) => AppointmentIdTypeORM, { prefix: false })
    public id: AppointmentIdTypeORM;

    @Column ('int', { name: 'customer_id', nullable: false, unsigned: true})
    public customerId: number;

    @Column ('int', {name: 'mechanic_id', nullable: false, unsigned: true})
    public mechanicId: number;

    @Column({ name: 'status', type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.REQUESTED })
    public status: AppointmentStatus;

    @Column({ name: 'type', type: 'enum', enum: AppointmentType, default: AppointmentType.PREMIUM })
    public type: AppointmentType;


}