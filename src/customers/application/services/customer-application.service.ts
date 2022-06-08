import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterCustomerCommand } from "../commands/register-customer.command";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";
import { RegisterCustomerResponseDto } from "../dtos/response/register-customer-response.dto";
import { RegisterCustomerValidator } from "../validators/register-customer.validator";

@Injectable()
export class CustomersApplicationService{
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private registerCustomerValidator:  RegisterCustomerValidator
    ){}
    
    async register(
        registerCustomerRequestDto: RegisterCustomerRequestDto,
    ): Promise<Result<AppNotification, RegisterCustomerResponseDto>> {
        const notification: AppNotification = await this.registerCustomerValidator.validate(
            registerCustomerRequestDto,
        );

        if (notification.hasErrors()) {
        return Result.error(notification);
        }

        const registerCustomerCommand: RegisterCustomerCommand =
        new RegisterCustomerCommand(
            registerCustomerRequestDto.firstName,
            registerCustomerRequestDto.lastName,
            registerCustomerRequestDto.email,
            registerCustomerRequestDto.password,
            registerCustomerRequestDto.carMake
        );

        const customerId = await this.commandBus.execute(registerCustomerCommand);

        const registerCustomerResponseDto: RegisterCustomerResponseDto =
        new RegisterCustomerResponseDto(
            customerId,
            registerCustomerRequestDto.firstName,
            registerCustomerRequestDto.lastName,
            registerCustomerRequestDto.email,
            registerCustomerRequestDto.password,
            registerCustomerRequestDto.carMake
        );

        return Result.ok(registerCustomerResponseDto);
    }
}
