import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerId } from "src/customers/domain/value-objects/customer-id.value";
import { UserAbstractFactory } from "../abstract/user-abstract-factory";
import { CreateFromParams } from "../params/create-from.params";

export class CustomerFactory extends UserAbstractFactory{
    public createFrom(params: CreateFromParams): Customer {
        return new Customer(
            CustomerId.create(0),
            params.name,
            params.email,
            params.password,
            params.carMake
        );
    }  
}