import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Customer } from '../entities/customer.entity';
import { CarMake } from '../value-objects/car-make.value';
import { CustomerId } from '../value-objects/customer-id.value';

export class CustomerFactory {
    public static createFrom(id: CustomerId, name: CustomerName, email: Email, password: Password, carMake: CarMake): Customer {
        return new Customer(id, name, email, password, carMake);
    }
}

