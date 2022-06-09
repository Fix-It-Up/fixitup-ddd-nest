import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterMechanicRequestDto } from "../application/dtos/request/register-mechanic-request.dto";
import { RegisterMechanicResponseDto } from "../application/dtos/response/register-mechanic-response.dto";
import { GetMechanicsQuery } from "../application/queries/get-mechanics.query";
import { MechanicsApplicationService } from "../application/services/mechanic-application.service";

@Controller('mechanics')
export class MechanicsController{
    constructor(
        private readonly mechanicApplicationService: MechanicsApplicationService,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async register(
      @Body() registerMechanicRequestDto: RegisterMechanicRequestDto,
      @Res({ passthrough: true }) response
    ): Promise<object> {
      try {
        //delego a la capa de aplicacion para realizar las validaciones
        //App Notification -> notificar de los posibles errores q tenga la aplicacion (patron notificacion)
        const result: Result<AppNotification, RegisterMechanicResponseDto> = await this.mechanicApplicationService.register(registerMechanicRequestDto);
        if (result.isSuccess()) {
            return ApiController.created(response, result.value);
        }
        return ApiController.error(response, result.error.getErrors());
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    }

    @Get()
    async getMechanics(@Res({ passthrough: true }) response): Promise<object> {
      try {
        const mechanics = await this.queryBus.execute(new GetMechanicsQuery());
        return ApiController.ok(response, mechanics);
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    }
}