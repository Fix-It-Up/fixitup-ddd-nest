import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterAppointmentRequestDto } from "../application/dtos/request/register-appointment-request.dto";
import { RegisterAppointmentResponseDto } from "../application/dtos/response/register-appointment-response.dto";
import { GetAppointmentsQuery } from "../application/queries/get-appointments.query";
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


    @Get()
    async getAppointments(@Res({ passthrough: true }) response): Promise<object>{
        try{
            const appointments = await this.queryBus.execute(new GetAppointmentsQuery());
            return ApiController.ok(response, appointments);
        } catch(error){
            return ApiController.serverError(response, error);
        }
    }
}