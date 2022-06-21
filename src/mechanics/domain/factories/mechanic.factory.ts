import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Mechanic } from '../entities/mechanic.entity';
import { MechanicAddress } from '../value-objects/mechanic-address.value.dto';
import { MechanicDescription } from '../value-objects/mechanic-description.value';
import { MechanicName } from '../value-objects/mechanic-name.value';

export class MechanicFactory {
    public static createFrom(id: number, mechanicName: MechanicName, email: Email, password: Password, address: MechanicAddress, description: MechanicDescription): Mechanic {
        return new Mechanic(id, mechanicName, email, password, address, description);
    }
}

