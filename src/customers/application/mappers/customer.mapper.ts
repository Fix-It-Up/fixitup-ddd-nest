import { EmailTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm";
import { PasswordTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer.typeorm";
import { CustomerIdTypeORM } from "src/customers/infrastructure/persistence/typeorm/value-objects/customer-id.typeorm";
import { CustomerNameTypeORM } from "src/customers/infrastructure/persistence/typeorm/value-objects/customer-name.typeorm";

export class CustomerMapper {
    public static toTypeORM(customer: Customer): CustomerTypeORM {
      const customerTypeORM: CustomerTypeORM = new CustomerTypeORM();
  
      customerTypeORM.id = CustomerIdTypeORM.from(customer.getId().getValue());
      customerTypeORM.name = CustomerNameTypeORM.from(
        customer.getName().getFirstName(),
        customer.getName().getLastName(),
      );
      customerTypeORM.email = EmailTypeORM.from(customer.getEmail().getValue());
      customerTypeORM.password = PasswordTypeORM.from(
        customer.getPassword().getValue(),
      );
      customerTypeORM.carMake = customer.getCarMake();
      return customerTypeORM;
    }
  }