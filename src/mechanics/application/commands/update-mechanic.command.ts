export class UpdateCustomerCommand {
    constructor(
      public readonly id: number,
      public readonly mechanicName: string,
      public readonly email: string,
      public readonly password: string,
      public readonly address: string,
      public readonly description: string
    ) {}
  }