import { AppointmentType } from "../enums/appointment.type";
import { AppointmentBasicFactory } from "./appointment-basic.factory";
import { AppointmentPremiumFactory } from "./appointment-premium.factory";


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