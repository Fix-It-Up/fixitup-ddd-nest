export class RegisterAppointmentCommand{
    constructor(
        public customerId: number,
        public mechanicId: number,
        public type: string,
        public date: string
    ){}
}