import { AppointmentStatus } from "src/appointments/domain/enums/appointment.status";


export class StatusTypeMapper {
  public static toTypeString(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.ACCEPTED:
        return 'Accepted';
      case AppointmentStatus.REQUESTED:
        return 'Requested';
      case AppointmentStatus.REJECTED:
        return 'Rejected';
      case AppointmentStatus.FINISHED:
        return 'Finished';
      default:
        return 'Not_Found';
    }
  }
  public static toTypeAppointmentStatus(status: string): AppointmentStatus {
    switch (status) {
      case "Accepted":
        return AppointmentStatus.ACCEPTED;
      case "Requested":
        return AppointmentStatus.REQUESTED;
      case "Rejected":
        return AppointmentStatus.REJECTED;
        case "Finished":
        return AppointmentStatus.FINISHED;
      default:
        return AppointmentStatus.NOT_FOUND;
    }
  }
}