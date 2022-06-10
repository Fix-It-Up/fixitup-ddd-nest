import { Column } from 'typeorm';

export class CarMakeTypeORM {
  @Column('varchar', { name: 'car_make', length: 50, nullable: true })
  public carMake: string;

  private constructor(carMake: string) {
    this.carMake = carMake;
  }

  public static from(carMake: string): CarMakeTypeORM {
    return new CarMakeTypeORM(carMake);
  }
}