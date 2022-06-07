import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { CustomerTypeORM } from 'src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm';
import { Repository } from 'typeorm';

import { Result } from 'typescript-result';
import { RegisterCustomerCommand } from '../../commands/register-customer.command';

@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler implements ICommandHandler<RegisterCustomerCommand> {
    constructor(
        @InjectRepository(CustomerTypeORM)
        private customerRepository: Repository<CustomerTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterCustomerCommand) {
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
      
    }












        
}