import { CarMake } from "src/customers/domain/value-objects/car-make.value";
import { CustomerName } from "../../value-objects/customer-name.value";
import { Email } from "../../value-objects/email.value";
import { Password } from "../../value-objects/password.value";

export interface CreateFromParams{
    //shared
    email: Email;
    password: Password;
    //customer
    name?: CustomerName;
    carMake?: CarMake;
    //mechanic
    

}