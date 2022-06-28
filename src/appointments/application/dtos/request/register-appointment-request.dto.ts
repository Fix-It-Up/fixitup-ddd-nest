export class RegisterAppointmentRequestDto{
    constructor(
        public readonly customerId: number,
        public readonly mechanicId: number,
        public readonly type: string,
        public readonly date: string){}
}