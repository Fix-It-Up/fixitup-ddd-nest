import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterMechanicCommand } from '../../commands/register-mechanic.command';

@CommandHandler(RegisterMechanicCommand)
export class RegisterMechanicHandler implements ICommandHandler<RegisterMechanicCommand> {
    constructor(
        //create repositories
        @InjectRepository(MechanicTypeORM)
        private mechanicRepository: Repository<MechanicTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterMechanicCommand) {
        let mechanicId: number = 0;
        //add mechanic name
        const mechanicNameResult: Result<AppNotification, MechanicName> = MechanicName.create(
            command.name
        );
        
        if(mechanicNameResult.isFailure()){
            return 0;
        }

        const emailResult: Result<AppNotification, Email> = Email.create(
            command.email,
        );

        if(emailResult.isFailure()){
            return 0;
        }

        const passwordResult: Result<AppNotification, Password> = Password.create(
            command.password,
        );
      
        if (passwordResult.isFailure()) {
            return 0;
        }

        const carMakeResult: Result<AppNotification, CarMake> = CarMake.create(command.carMake);
        if (carMakeResult.isFailure()) {
            return 0;
        }
        let customer: Customer = CustomerFactory.createFrom(customerId, customerNameResult.value, emailResult.value, passwordResult.value, carMakeResult.value);
        let customerTypeORM: CustomerTypeORM = CustomerMapper.toTypeORM(customer);
        customerTypeORM = await this.customerRepository.save(customerTypeORM);
        if (customerTypeORM == null) {
          return customerId;
        }
        customerId = Number(customerTypeORM.id);
        customer.changeId(customerId);
        customer = this.publisher.mergeObjectContext(customer);
        customer.register();
        customer.commit();
        return customerId;
    }












        
}