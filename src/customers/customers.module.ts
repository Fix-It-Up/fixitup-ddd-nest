import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomersController } from "./api/customers.controller";
import { RegisterCustomerHandler } from "./application/handlers/commands/register-customer.handler";
import { CustomerRegisteredHandler } from "./application/handlers/events/customer-registered.handler";
import { GetCustomersHandler } from "./application/handlers/queries/get-customers.handler";

import { CustomersApplicationService } from "./application/services/customer-application.service";
import { RegisterCustomerValidator } from "./application/validators/register-customer.validator";
import { CustomerTypeORM } from "./infrastructure/persistence/typeorm/entities/customer.typeorm";

export const CommandHandlers = [
    RegisterCustomerHandler
];

export const EventHandlers = [CustomerRegisteredHandler]

export const QueryHandlers = [
    GetCustomersHandler
];

  export const Validators = [
    RegisterCustomerValidator
];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([CustomerTypeORM])],
    controllers: [CustomersController],
    providers: [
      CustomersApplicationService,
      ...Validators,
      ...CommandHandlers,
      ...EventHandlers,
      ...QueryHandlers,
    ],
  })

export class CustomersModule {}