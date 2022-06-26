import { Appointment } from "../receiver/appointment";
import { AcceptAppointmentCommand } from "../concrete/accept-appointment.command";
import { ChangeStatus } from "../invoker/change-status";
import { Command } from "../abstract/command";

function clientCode() {
    // Receptor
    let appointment1: Appointment = new Appointment();

    // Command
    let command: Command = new AcceptAppointmentCommand(appointment1);

     // Invoker
    let changeStatus: ChangeStatus = new ChangeStatus();
    changeStatus.invoke(command);
    changeStatus.invoke(command);
    console.log("****************************");

}

// clientCode();