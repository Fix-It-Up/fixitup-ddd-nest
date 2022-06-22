export class UpdateAppointmentResponseDto{
    constructor(
        public readonly id: number,
        public readonly customerId: number,
        public readonly mechanicId: number,
        public readonly status: string,
        public readonly type: string,
        public readonly date: string,
        public readonly amount: number
    ){}
}