export class AppointmentCreatedEvent{
    constructor(
        public id: number,
        public customerId: number,
        public mechanicId: number,
        public status: string,
        public type: string,
        public date: string,
        public amount: number
    ){}
}