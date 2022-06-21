import { Mechanic } from "src/mechanics/domain/entities/mechanic.entity";
import { MechanicId } from "src/mechanics/domain/value-objects/mechanic-id.value";
import { UserAbstractFactory } from "../abstract/user-abstract-factory";
import { CreateFromParams } from "../params/create-from.params";

export class MechanicFactory extends UserAbstractFactory{
    public createFrom(params: CreateFromParams): Mechanic {
        return new Mechanic(
            MechanicId.create(0),
            params.mechanicName,
            params.email,
            params.password,
            params.address,
            params.description
        );
    }  
}