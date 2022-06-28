import { Column } from 'typeorm';

export class MechanicNameTypeORM {
  @Column('varchar', { name: 'mechanic_name', length: 100, nullable: true })
  public mechanicName: string;

  private constructor(mechanicName: string) {
    this.mechanicName = mechanicName;
  }

  public static from(mechanicName: string): MechanicNameTypeORM {
    return new MechanicNameTypeORM(mechanicName);
  }
}