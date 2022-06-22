import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterMechanicCommand } from "../commands/register-mechanic.command";
import { RegisterMechanicRequestDto } from "../dtos/request/register-mechanic-request.dto";
import { RegisterMechanicResponseDto } from "../dtos/response/register-mechanic-response.dto";
import { RegisterMechanicValidator } from "../validators/register-mechanic.validator";

@Injectable()
export class MechanicsApplicationService{
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private registerMechanicValidator:  RegisterMechanicValidator
    ){}
    
    async register(
        registerMechanicRequestDto: RegisterMechanicRequestDto,
    ): Promise<Result<AppNotification, RegisterMechanicResponseDto>> {
        const notification: AppNotification = await this.registerMechanicValidator.validate(
            registerMechanicRequestDto,
        );

        if (notification.hasErrors()) {
            return Result.error(notification);
        }

        const registerMechanicCommand: RegisterMechanicCommand =
        new RegisterMechanicCommand(
            registerMechanicRequestDto.mechanicName,
            registerMechanicRequestDto.email,
            registerMechanicRequestDto.password,
            registerMechanicRequestDto.address,
            registerMechanicRequestDto.description
        );

        const mechanicId: number = await this.commandBus.execute(registerMechanicCommand);
        console.log("id here is" + mechanicId);
        const registerMechanicResponseDto: RegisterMechanicResponseDto =
        new RegisterMechanicResponseDto(
            mechanicId,
            registerMechanicRequestDto.mechanicName,
            registerMechanicRequestDto.email,
            registerMechanicRequestDto.password,
            registerMechanicRequestDto.address,
            registerMechanicRequestDto.description
        );

        return Result.ok(registerMechanicResponseDto);
    }
}
