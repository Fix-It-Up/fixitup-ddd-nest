export class RegisterCustomerResponseDto {
    constructor(
        public id: number,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly carMake: string
    ) {}
  }