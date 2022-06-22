export class AppointmentId {
    private readonly value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static create(value: number) {
      return new AppointmentId(value);
    }

    public static of(value: number): AppointmentId {
      return new AppointmentId(value);
    }
  
    public getValue(): number {
      return this.value;
    }
  }
