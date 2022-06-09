export class RegisterMechanicCommand {
    constructor(
      public readonly name: string,
      public readonly email: string,
      public readonly password: string,
      public readonly address: string,
      public readonly description: string
    ) {}
  }