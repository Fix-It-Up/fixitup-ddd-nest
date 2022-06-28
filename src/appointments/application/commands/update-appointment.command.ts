export class UpdateAppointmentCommand {
    constructor(
      public id: number,
      public status: string
    ) {}
  }