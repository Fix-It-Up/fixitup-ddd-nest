import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { MechanicTypeORM } from "src/mechanics/infrastructure/persistence/typeorm/entities/mechanic.typeorm";
import { Repository } from "typeorm";
import { RegisterMechanicRequestDto } from "../dtos/request/register-mechanic-request.dto";

export class RegisterMechanicValidator{
    constructor(
        //create repository
        @InjectRepository(MechanicTypeORM)
        private mechanicRepository: Repository<MechanicTypeORM>,
    ){}


    public async validate(registerMechanicRequestDto: RegisterMechanicRequestDto): 
    Promise<AppNotification>{

    const notification: AppNotification = new AppNotification();
    
    const mechanicName: string = registerMechanicRequestDto.mechanicName.trim();

    if (mechanicName.length <= 0) {
      notification.addError('Mechanic name is required', null);
    }
    //check attributes

    const email: string = registerMechanicRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('mechanic email is required', null);
    }

    const password: string = registerMechanicRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('mechanic password is required', null);
    }

    const address: string = registerMechanicRequestDto.address.trim();

    if (address.length <= 0) {
      notification.addError('Mechanic address is required', null);
    }

    const description: string = registerMechanicRequestDto.description.trim();

    if (description.length <= 0) {
      notification.addError('Mechanic description is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const mechanic: MechanicTypeORM = await this.mechanicRepository.createQueryBuilder().where("email = :email", { email }).getOne();

    if (mechanic != null) {
      notification.addError('email is taken', null);
    }

    return notification;

    }
}