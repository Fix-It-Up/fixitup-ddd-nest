import {Command} from "../abstract/command";
import { Appointment } from "../receiver/appointment";

export class AcceptAppointmentCommand implements Command {
    //Receiver - Receptor
    private appointment: Appointment;

    constructor(appointment : Appointment) {
        this.appointment = appointment;
    }

    public execute(): void {
        this.appointment.acceptAppointment();
    }
}