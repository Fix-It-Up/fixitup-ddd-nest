export class RegisterMechanicResponseDto {
    constructor(
        public id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly address: string,
        public readonly description: string
    ) {}
  }