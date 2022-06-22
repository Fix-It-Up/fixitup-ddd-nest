import { CarMake } from "src/customers/domain/value-objects/car-make.value";
import { MechanicAddress } from "src/mechanics/domain/value-objects/mechanic-address.value.dto";
import { MechanicDescription } from "src/mechanics/domain/value-objects/mechanic-description.value";
import { MechanicName } from "src/mechanics/domain/value-objects/mechanic-name.value";
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
    mechanicName?: MechanicName;
    address?: MechanicAddress;
    description?: MechanicDescription;

}