export class MechanicId {
    private readonly value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static create(value: number) {
      return new MechanicId(value);
    }

    public static of(value: number): MechanicId {
      return new MechanicId(value);
    }
  
    public getValue(): number {
      return this.value;
    }
  }
