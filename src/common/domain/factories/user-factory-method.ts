import { UserType } from "../enums/user-type.enum";
import { UserAbstractFactory } from "./abstract/user-abstract-factory";
import { CustomerFactory } from "./concrete/customer.factory";
import { MechanicFactory } from "./concrete/mechanic.factory";

export class UserFactoryMethod {
    public static getType(userType: UserType): UserAbstractFactory {
      if (userType === UserType.CUSTOMER) {
        return new CustomerFactory();
      }
      if (userType === UserType.MECHANIC) {
        return new MechanicFactory();
      }     
  
      return new CustomerFactory();
    }
  }