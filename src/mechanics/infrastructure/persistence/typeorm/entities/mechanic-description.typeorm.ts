import { Column } from 'typeorm';

export class MechanicDescriptionTypeORM {
  @Column('varchar', { name: 'description', length: 200, nullable: true })
  public description: string;

  private constructor(description: string) {
    this.description = description;
  }

  public static from(description: string): MechanicDescriptionTypeORM {
    return new MechanicDescriptionTypeORM(description);
  }
}