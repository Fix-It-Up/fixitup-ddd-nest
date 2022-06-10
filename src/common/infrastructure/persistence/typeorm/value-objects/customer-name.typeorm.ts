import { Column } from 'typeorm';

export class CustomerNameTypeORM {
  @Column('varchar', { name: 'first_name', length: 30, nullable: false })
  public firstName: string;

  @Column('varchar', { name: 'last_name', length: 30, nullable: false })
  public lastName: string;

  private constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static from(firstName: string, lastName: string): CustomerNameTypeORM {
    return new CustomerNameTypeORM(firstName, lastName);
  }
}