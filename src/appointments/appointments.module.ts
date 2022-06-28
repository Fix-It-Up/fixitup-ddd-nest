import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentsController } from "./api/appointments.controller";
import { UpdateAppointmentRequestDto } from "./application/dtos/request/update-appointment-request.dto";
import { RegisterAppointmentHandler } from "./application/handlers/commands/register-appointment.handler";
import { GetAppointmentsHandler } from "./application/handlers/queries/get-appointments.handler";
import { AppointmentApplicationService } from "./application/services/appointment-application.service";
import { RegisterAppointmentValidator } from "./application/validators/register-appointment.validator";
import { AppointmentAcceptedEvent } from "./domain/events/appointment-accepted.event";
import { AppointmentCreatedEvent } from "./domain/events/appointment-created.event";
import { AppointmentRejectedEvent } from "./domain/events/appointment-rejected.event";
import { AppointmentTypeORM } from "./infrastructure/persistence/typeorm/entities/appointment.typeorm";

export const CommandHandlers = [
    RegisterAppointmentHandler
];

export const EventHandlers = [AppointmentRejectedEvent, AppointmentAcceptedEvent, AppointmentCreatedEvent];

export const QueryHandlers = [
    GetAppointmentsHandler
];

export const Validators = [
    RegisterAppointmentValidator
];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([AppointmentTypeORM])],
    controllers: [AppointmentsController],
    providers: [
      AppointmentApplicationService,
      ...Validators,
      ...CommandHandlers,
      ...EventHandlers,
      ...QueryHandlers,
    ],
  })

export class AppointmentsModule {}