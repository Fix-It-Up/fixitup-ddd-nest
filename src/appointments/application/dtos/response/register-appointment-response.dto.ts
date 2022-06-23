export class RegisterAppointmentResponseDto{
    constructor(
        public readonly id: number,
        public readonly customerId: number,
        public readonly mechanicId: number,
        public readonly type: string,
        public readonly date: string
    ){}
}