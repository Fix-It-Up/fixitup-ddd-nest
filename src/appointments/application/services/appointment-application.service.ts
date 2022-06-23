import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { RegisterCustomerResponseDto } from "src/customers/application/dtos/response/register-customer-response.dto";
import { Result } from "typescript-result";
import { RegisterAppointmentCommand } from "../commands/register-appointment.command";
import { RegisterAppointmentRequestDto } from "../dtos/request/register-appointment-request.dto";
import { RegisterAppointmentResponseDto } from "../dtos/response/register-appointment-response.dto";
import { RegisterAppointmentValidator } from "../validators/register-appointment.validator";

//@Injectable
export class AppointmentApplicationService{
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private registerAppointmentValidator: RegisterAppointmentValidator
    ){}

    async register(
        registerAppointmentRequestDto: RegisterAppointmentRequestDto
    ): Promise<Result<AppNotification, RegisterAppointmentRequestDto>>{
        const notification: AppNotification = await this.registerAppointmentValidator.validate(
            registerAppointmentRequestDto,
        );
        if (notification.hasErrors()) {
            return Result.error(notification);
        }

        const registerAppointmentCommand: RegisterAppointmentCommand =
        new RegisterAppointmentCommand(
            registerAppointmentRequestDto.customerId,
            registerAppointmentRequestDto.mechanicId,
            registerAppointmentRequestDto.type,
            registerAppointmentRequestDto.date,
        );

        
        const appointmentId: number = await this.commandBus.execute(registerAppointmentCommand);

        const registerAppointmentResponseDto: RegisterAppointmentResponseDto =
        new RegisterAppointmentResponseDto(
            appointmentId,
            registerAppointmentRequestDto.customerId,
            registerAppointmentRequestDto.mechanicId,
            registerAppointmentRequestDto.type,
            registerAppointmentRequestDto.date,
        );

        return Result.ok(registerAppointmentResponseDto);
    }
}