import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Customer } from '../entities/customer.entity';

export class CustomerFactory {
    public static createFrom(name: CustomerName, email: Email, password: Password, carMake: string): Customer {
        return new Customer(name, email, password, carMake);
    }
}

