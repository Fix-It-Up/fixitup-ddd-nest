import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterAppointmentRequestDto } from "../application/dtos/request/register-appointment-request.dto";
import { RegisterAppointmentResponseDto } from "../application/dtos/response/register-appointment-response.dto";
import { AppointmentApplicationService } from "../application/services/appointment-application.service";



@Controller('appointments')
export class AppointmentsController{
    constructor(
        private readonly queryBus: QueryBus,
        private readonly appointmentApplicationService: AppointmentApplicationService
        ){}

    @Post()
    async register(
        @Body() registerAppointmentRequestDto: RegisterAppointmentRequestDto,
        @Res({ passthrough: true}) response
    ): Promise<Object>{
        try{
            const result: Result<AppNotification, RegisterAppointmentResponseDto> = await this.appointmentApplicationService.register(registerAppointmentRequestDto);
            if(result.isSuccess()){
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error){
            return ApiController.serverError(response, error);
        }
    }
}