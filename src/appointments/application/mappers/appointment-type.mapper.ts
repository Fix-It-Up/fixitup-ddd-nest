import { AppointmentType } from "src/appointments/domain/enums/appointment.type";


export class AppointmentTypeMapper {
  public static toTypeString(type: AppointmentType): string {
    switch (type) {
      case AppointmentType.BASIC:
        return 'Basic';
      case AppointmentType.PREMIUM:
        return 'Premium';
      default:
        return 'Not_Found';
    }
  }
  public static toTypeAppointmentType(type: string): AppointmentType {
    switch (type) {
      case "Basic":
        return AppointmentType.BASIC;
      case "Premium":
        return AppointmentType.PREMIUM;
      default:
        return AppointmentType.NOT_FOUND;
    }
  }
}