export class MechanicRegisteredEvent {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
      public address: string,
      public description: string
    ) {}
  }