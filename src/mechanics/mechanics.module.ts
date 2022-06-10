import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MechanicsController } from "./api/mechanics.controller";
import { RegisterMechanicHandler } from "./application/handlers/commands/register-mechanic.handler";
import { MechanicRegisteredHandler } from "./application/handlers/events/mechanic-registered.handler";
import { GetMechanicsHandler } from "./application/handlers/queries/get-mechanics.handler";
import { MechanicsApplicationService } from "./application/services/mechanic-application.service";
import { RegisterMechanicValidator } from "./application/validators/register-mechanic.validator";
import { MechanicTypeORM } from "./infrastructure/persistence/typeorm/entities/mechanic.typeorm";

export const CommandHandlers = [
    RegisterMechanicHandler
];

export const EventHandlers = [MechanicRegisteredHandler]

export const QueryHandlers = [
    GetMechanicsHandler
];

  export const Validators = [
    RegisterMechanicValidator
];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([MechanicTypeORM])],
    controllers: [MechanicsController],
    providers: [
      MechanicsApplicationService,
      ...Validators,
      ...CommandHandlers,
      ...EventHandlers,
      ...QueryHandlers,
    ],
  })

export class MechanicsModule {}