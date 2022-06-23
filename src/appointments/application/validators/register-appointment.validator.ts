import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentTypeORM } from "src/appointments/infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { CustomerTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm";
import { Repository } from "typeorm";
import { RegisterAppointmentRequestDto } from "../dtos/request/register-appointment-request.dto";

export class RegisterAppointmentValidator{
    constructor(
        @InjectRepository(CustomerTypeORM)
        private customerRepository: Repository<CustomerTypeORM>,
    ){}


    public async validate(registerAppointmentRequestDto: RegisterAppointmentRequestDto): 
    Promise<AppNotification>{

    const notification: AppNotification = new AppNotification();

    const customerId: number = registerAppointmentRequestDto.customerId;

    if (!customerId) {
      notification.addError('Customer ID is required', null);
    }

    const mechanicId: number = registerAppointmentRequestDto.mechanicId;

    if (!mechanicId) {
      notification.addError('Mechanic ID is required', null);
    }

    const type: string = registerAppointmentRequestDto.type.trim();

    if (type.length <= 0) {
      notification.addError('Type is required', null);
    }

    const date: string = registerAppointmentRequestDto.date.trim();

    if (date.length <= 0) {
      notification.addError('Date is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
    }
}