import { EmailTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/email.typeorm";
import { PasswordTypeORM } from "src/common/infrastructure/persistence/typeorm/value-objects/password.typeorm";
import { Mechanic } from "src/mechanics/domain/entities/mechanic.entity";
import { MechanicTypeORM } from "src/mechanics/infrastructure/persistence/typeorm/entities/mechanic.typeorm";
import { MechanicNameTypeORM } from "src/mechanics/infrastructure/persistence/typeorm/entities/mechanic-name.typeorm";
import { MechanicAddressTypeORM } from "src/mechanics/infrastructure/persistence/typeorm/entities/mechanic-address.typeorm";

export class MechanicMapper {
    public static toTypeORM(mechanic: Mechanic): MechanicTypeORM {
      const mechanicTypeORM: MechanicTypeORM = new MechanicTypeORM();
      //bug here!
      mechanicTypeORM.id = mechanic.getId();
    
      mechanicTypeORM.name = MechanicNameTypeORM.from(
        mechanic.getName().getValue()
      );
      mechanicTypeORM.email = EmailTypeORM.from(mechanic.getEmail().getValue());

      mechanicTypeORM.password = PasswordTypeORM.from(
        mechanic.getPassword().getValue(),
      );
      mechanicTypeORM.address = MechanicAddressTypeORM.from(mechanic.getAddress().getValue());
      return mechanicTypeORM;
    }
  }