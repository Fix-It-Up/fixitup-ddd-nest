import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm';
import { CarMake } from 'src/customers/domain/value-objects/car-make.value';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CarMakeTypeORM } from './car-make.typeorm';
import { CustomerIdTypeORM } from './customer-id.typeorm';
import { CustomerNameTypeORM } from './customer-name.typeorm';


@Entity('customers')
export class CustomerTypeORM{
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: CustomerIdTypeORM;

    @Column((type) => CustomerNameTypeORM, {prefix: false})
    public name: CustomerNameTypeORM;

    @Column((type) => EmailTypeORM, {prefix: false})
    public email: EmailTypeORM;

    @Column((type) => PasswordTypeORM, {prefix: false})
    public password: PasswordTypeORM;

    @Column((type) => CarMakeTypeORM, {prefix: false})
    public carMake: CarMakeTypeORM;
}