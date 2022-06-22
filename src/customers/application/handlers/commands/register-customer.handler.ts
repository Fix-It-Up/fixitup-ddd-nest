import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { UserType } from 'src/common/domain/enums/user-type.enum';
import { UserAbstractFactory } from 'src/common/domain/factories/abstract/user-abstract-factory';
import { UserFactoryMethod } from 'src/common/domain/factories/user-factory-method';
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
        //client code for abstract factory (users)
        const userFactory: UserAbstractFactory = UserFactoryMethod.getType(
            UserType.CUSTOMER,
        );

        let customer: Customer = userFactory.createFrom(
            {name: customerNameResult.value,
             email: emailResult.value,
             password: passwordResult.value, 
             carMake: carMakeResult.value});
        console.log("creating type orm...")
        
        let customerTypeORM: CustomerTypeORM = CustomerMapper.toTypeORM(customer);
        console.log("type orm created")

        console.log("saving to repo...")
        console.log(customerTypeORM.email)
        console.log(customerTypeORM.id)
        console.log(customerTypeORM.name)
        console.log(customerTypeORM.carMake)
        console.log(customerTypeORM.password)
        customerTypeORM = await this.customerRepository.save(customerTypeORM);
        if (customerTypeORM == null) {
            return 0;
        }
        console.log("SAVED!!!")
        //keep an eye here
        //id.value sus
        console.log("changing customer id to" +customerTypeORM.id.value)
        const customerId = Number(customerTypeORM.id.value);
        customer.changeCustomerId(CustomerId.create(customerId));
        console.log("customer id has been changed to "+ customer.getCustomerId());
        customer = this.publisher.mergeObjectContext(customer);
        customer.register();
        customer.commit();
        return customerId;
    }












        
}