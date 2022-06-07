import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm';
import { Column, Entity, Unique } from 'typeorm';
import { CustomerIdTypeORM } from '../value-objects/customer-id.typeorm';
import { CustomerNameTypeORM } from '../value-objects/customer-name.typeorm';


@Entity('customers')
export class CustomerTypeORM{
    @Column((type) => CustomerIdTypeORM, {prefix: false})
    public id: CustomerIdTypeORM;

    @Column((type) => CustomerNameTypeORM, {prefix: false})
    public name: CustomerNameTypeORM;

    @Column((type) => EmailTypeORM, {prefix: false})
    public email: EmailTypeORM;

    @Column((type) => PasswordTypeORM, {prefix: false})
    public password: PasswordTypeORM;

    @Column('varchar', { name: 'car_make', length: 50, nullable: false })
    public carMake: string;
}