import { AppointmentType } from "../enums/appointment.type";
import { AppointmentBasicFactory } from "./component/concrete/appointment-basic.factory";
import { AppointmentPremiumFactory } from "./component/concrete/appointment-premium.factory";


export class AppointmentFactoryMethod {
    public static getType(type: AppointmentType) {
      if (type === AppointmentType.PREMIUM) {
        return new AppointmentPremiumFactory();
      }
      if (type === AppointmentType.BASIC) {
        return new AppointmentBasicFactory();
      }     
  
      return new AppointmentBasicFactory();
    }
  }