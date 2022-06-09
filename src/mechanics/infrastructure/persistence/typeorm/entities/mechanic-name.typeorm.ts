import { Column } from 'typeorm';

export class MechanicNameTypeORM {
  @Column('varchar', { name: 'mechanic_name', length: 50, nullable: true })
  public name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static from(name: string): MechanicNameTypeORM {
    return new MechanicNameTypeORM(name);
  }
}