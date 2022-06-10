import { Column } from 'typeorm';

export class MechanicAddressTypeORM {
  @Column('varchar', { name: 'address', length: 100, nullable: true })
  public address: string;

  private constructor(address: string) {
    this.address = address;
  }

  public static from(address: string): MechanicAddressTypeORM {
    return new MechanicAddressTypeORM(address);
  }
}