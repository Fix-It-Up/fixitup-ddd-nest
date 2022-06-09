import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { CustomerTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm";
import { Repository } from "typeorm";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";

export class RegisterMechanicValidator{
    constructor(
        //create repository
        @InjectRepository(MechanicTypeORM)
        private mechanicRepository: Repository<MechanicTypeORM>,
    ){}


    public async validate(registerMechanicRequestDto: RegisterMechanicRequestDto): 
    Promise<AppNotification>{

    const notification: AppNotification = new AppNotification();

    const name: string = registerMechanicRequestDto.name.trim();

    if (name.length <= 0) {
      notification.addError('Mechanic name is required', null);
    }
    //check attributes

    const lastName: string = registerCustomerRequestDto.lastName.trim();

    if (lastName.length <= 0) {
      notification.addError('Customer lastName is required', null);
    }

    const email: string = registerCustomerRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Customer email is required', null);
    }

    const password: string = registerCustomerRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Customer password is required', null);
    }

    const carMake: string = registerCustomerRequestDto.carMake.trim();

    if (carMake.length <= 0) {
      notification.addError('Customer car make is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const customer: CustomerTypeORM = await this.customerRepository.createQueryBuilder().where("email = :email", { email }).getOne();

    if (customer != null) {
      notification.addError('email is taken', null);
    }

    return notification;

    }
}