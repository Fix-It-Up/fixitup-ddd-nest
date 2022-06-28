import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm';
import { MechanicId } from 'src/mechanics/domain/value-objects/mechanic-id.value';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MechanicAddressTypeORM } from './mechanic-address.typeorm';
import { MechanicDescriptionTypeORM } from './mechanic-description.typeorm';
import { MechanicIdTypeORM } from './mechanic-id.typeorm';
import { MechanicNameTypeORM } from './mechanic-name.typeorm';


@Entity('mechanics')
export class MechanicTypeORM{
    @Column((type) => MechanicIdTypeORM, { prefix: false })
    public id: MechanicIdTypeORM;

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