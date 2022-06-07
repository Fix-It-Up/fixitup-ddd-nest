import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
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

    async execute(command: RegisterCustomerCommand): Promise<any> {
      // const nameResult: Result<AppNotification, Name> 
    }












        
}