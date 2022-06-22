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
      console.log("before is" + customer.getCustomerId().getValue());
      customerTypeORM.id = CustomerIdTypeORM.from(customer.getCustomerId().getValue());
      console.log("here is " +customerTypeORM.id.value);
      customerTypeORM.name = CustomerNameTypeORM.from(
        customer.getName().getFirstName(),
        customer.getName().getLastName(),
      );
      customerTypeORM.email = EmailTypeORM.from(customer.getEmail().getValue());
      customerTypeORM.password = PasswordTypeORM.from(
        customer.getPassword().getValue(),
      );
      customerTypeORM.carMake = CarMakeTypeORM.from(customer.getCarMake().getValue());
      return customerTypeORM;
    }
  }