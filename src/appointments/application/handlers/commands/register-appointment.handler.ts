import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Appointment } from "src/appointments/domain/entities/appointment.entity";
import { AppointmentStatus } from "src/appointments/domain/enums/appointment.status";
import { AppointmentType } from "src/appointments/domain/enums/appointment.type";
import { AppointmentAbstractFactory } from "src/appointments/domain/factories/appointment-abstract.factory";
import { AppointmentFactoryMethod } from "src/appointments/domain/factories/appointment-factory-method";
import { CarOzonation } from "src/appointments/domain/factories/decorator/concrete/car-ozonation";
import { TyreRepair } from "src/appointments/domain/factories/decorator/concrete/tyre-repair";
import { WinterInspection } from "src/appointments/domain/factories/decorator/concrete/winter-inspection";
import { AppointmentDate } from "src/appointments/domain/value-objects/appointment-date.value";
import { AppointmentId } from "src/appointments/domain/value-objects/appointment-id.value";
import { AppointmentTypeORM } from "src/appointments/infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { Repository } from "typeorm";
import { RegisterAppointmentCommand } from "../../commands/register-appointment.command";
import { AppointmentMapper } from "../../mappers/appointment.mapper";

@CommandHandler(RegisterAppointmentCommand)
export class RegisterAppointmentHandler implements ICommandHandler<RegisterAppointmentCommand>{
    constructor(
        @InjectRepository(AppointmentTypeORM)
        private appointmentRepository: Repository<AppointmentTypeORM>,
        private publisher: EventPublisher,
    ){}

    async execute(command: RegisterAppointmentCommand) {

        if(command.type === "Premium"){
            let appointmentFactory: AppointmentAbstractFactory = AppointmentFactoryMethod.getType(AppointmentType.PREMIUM);
            //Using Decorator Pattern so as to create services for each appointment type
            appointmentFactory = new CarOzonation(appointmentFactory);
            appointmentFactory = new TyreRepair(appointmentFactory);
            appointmentFactory = new WinterInspection(appointmentFactory);
            let amount = appointmentFactory.calculateCost();
            let appointment: Appointment = AppointmentAbstractFactory.createFrom(
            { customerId: command.customerId,
                mechanicId: command.mechanicId,
                status: AppointmentStatus.REQUESTED,
                type: AppointmentType.PREMIUM,
                date: AppointmentDate.from(command.date),
                amount: amount,
            })

            let appointmentTypeORM: AppointmentTypeORM = AppointmentMapper.toTypeORM(appointment);
            appointmentTypeORM = await this.appointmentRepository.save(appointmentTypeORM);
            if (appointmentTypeORM == null) {
                return 0;
            }
    
            const appointmentId = Number(appointmentTypeORM.id.value);
            appointment.changeAppointmentId(AppointmentId.create(appointmentId));
            appointment = this.publisher.mergeObjectContext(appointment);
            appointment.created();
            appointment.commit();
            return appointmentId;
        }
        if(command.type === "Basic"){
            let appointmentFactory: AppointmentAbstractFactory = AppointmentFactoryMethod.getType(AppointmentType.BASIC);
            let amount = appointmentFactory.calculateCost();
            let appointment: Appointment = AppointmentAbstractFactory.createFrom(
                { customerId: command.customerId,
                    mechanicId: command.mechanicId,
                    status: AppointmentStatus.REQUESTED,
                    type: AppointmentType.BASIC,
                    date: AppointmentDate.from(command.date),
                    amount: amount
                })
                let appointmentTypeORM: AppointmentTypeORM = AppointmentMapper.toTypeORM(appointment);
                appointmentTypeORM = await this.appointmentRepository.save(appointmentTypeORM);
                if (appointmentTypeORM == null) {
                    return 0;
                }
        
                const appointmentId = Number(appointmentTypeORM.id.value);
                appointment.changeAppointmentId(AppointmentId.create(appointmentId));
                appointment = this.publisher.mergeObjectContext(appointment);
                appointment.created();
                appointment.commit();
                return appointmentId;
        }

    }


}