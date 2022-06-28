import { Appointment } from "src/appointments/domain/entities/appointment.entity";
import { AppointmentDate } from "src/appointments/domain/value-objects/appointment-date.value";
import { AppointmentIdTypeORM } from "src/appointments/infrastructure/persistence/typeorm/entities/appointment-id.typeorm";
import { AppointmentTypeORM } from "src/appointments/infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { DateTypeOrm } from "src/appointments/infrastructure/persistence/typeorm/entities/date.typeorm";

export class AppointmentMapper{
    public static toTypeORM(appointment: Appointment) : AppointmentTypeORM{
        const appointmentTypeORM: AppointmentTypeORM = new AppointmentTypeORM();
        appointmentTypeORM.id = AppointmentIdTypeORM.from(appointment.getAppointmentId().getValue());
        appointmentTypeORM.customerId = appointment.getCustomerId();
        appointmentTypeORM.mechanicId = appointment.getMechanicId();
        appointmentTypeORM.status = appointment.getStatus();
        appointmentTypeORM.type = appointment.getType();
        appointmentTypeORM.date = DateTypeOrm.from(appointment.getDate().getDate());
        appointmentTypeORM.amount = appointment.getAmount();
        return appointmentTypeORM;
    }
}