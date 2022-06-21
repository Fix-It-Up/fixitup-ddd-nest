import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MechanicAddressTypeORM } from './mechanic-address.typeorm';
import { MechanicDescriptionTypeORM } from './mechanic-description.typeorm';
import { MechanicNameTypeORM } from './mechanic-name.typeorm';


@Entity('mechanics')
export class MechanicTypeORM{
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column((type) => MechanicNameTypeORM, {prefix: false})
    public mechanicName: MechanicNameTypeORM;

    @Column((type) => EmailTypeORM, {prefix: false})
    public email: EmailTypeORM;

    @Column((type) => PasswordTypeORM, {prefix: false})
    public password: PasswordTypeORM;

    @Column((type) => MechanicAddressTypeORM, {prefix: false})
    public address: MechanicAddressTypeORM;

    @Column((type) => MechanicDescriptionTypeORM, {prefix: false})
    public description: MechanicDescriptionTypeORM;
}