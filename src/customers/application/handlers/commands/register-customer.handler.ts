import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerFactory } from 'src/customers/domain/factories/customer.factory';
import { CarMake } from 'src/customers/domain/value-objects/car-make.value';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.value';
import { CustomerTypeORM } from 'src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm';
import { Repository } from 'typeorm';

import { Result } from 'typescript-result';
import { RegisterCustomerCommand } from '../../commands/register-customer.command';
import { CustomerMapper } from '../../mappers/customer.mapper';

@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler implements ICommandHandler<RegisterCustomerCommand> {
    constructor(
        @InjectRepository(CustomerTypeORM)
        private customerRepository: Repository<CustomerTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterCustomerCommand) {
        let customerId: CustomerId = CustomerId.create(0);
        const customerNameResult: Result<AppNotification, CustomerName> = CustomerName.create(
            command.firstName, command.lastName,
        );
        
        if(customerNameResult.isFailure()){
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
        //keep an eye here
        customerId = CustomerId.create(customerTypeORM.id);
        customer.changeCustomerId(customerId);
        customer = this.publisher.mergeObjectContext(customer);
        customer.register();
        customer.commit();
        return customerId;
    }












        
}