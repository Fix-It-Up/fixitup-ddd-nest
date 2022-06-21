import { EmailTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm";
import { PasswordTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm";
import { CarMakeTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/car-make.typeorm";
import { CustomerIdTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer-id.typeorm";
import { CustomerNameTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer-name.typeorm";

export class CustomerMapper {
    public static toTypeORM(customer: Customer): CustomerTypeORM {
      const customerTypeORM: CustomerTypeORM = new CustomerTypeORM();
      //bug here!
      customerTypeORM.id = CustomerIdTypeORM.from(customer.getCustomerId().getValue());
    
      customerTypeORM.name = CustomerNameTypeORM.from(
        customer.getName().getFirstName(),
        customer.getName().getLastName(),
      );
      console.log('im in');
      console.log(customerTypeORM.name);
      customerTypeORM.email = EmailTypeORM.from(customer.getEmail().getValue());
      console.log(customerTypeORM.email)
      customerTypeORM.password = PasswordTypeORM.from(
        customer.getPassword().getValue(),
      );
      console.log(customerTypeORM.password);
      customerTypeORM.carMake = CarMakeTypeORM.from(customer.getCarMake().getValue());
      console.log(customerTypeORM.carMake);
      return customerTypeORM;
    }
  }