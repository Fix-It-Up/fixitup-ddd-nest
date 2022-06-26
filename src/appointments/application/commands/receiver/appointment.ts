// Receptor
export class Appointment {
    private isAccepted: boolean = false;

    public getIsAccepted(): boolean {
        return this.isAccepted;
    }

    public acceptAppointment(): void {
        if (this.isAccepted) {
            this.reject();
            this.isAccepted = false;
        } else {
            this.accept();
            this.isAccepted = true;
        }
    }

    public accept(): void {
        console.log("Appointment has been accepted");
    }

    public reject(): void {
        console.log("Appointment has been rejected");
    }
}