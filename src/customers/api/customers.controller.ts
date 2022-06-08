import { Body, Controller, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { RegisterCustomerResponseDto } from "../application/dtos/response/register-customer-response.dto";
import { CustomersApplicationService } from "../application/services/customer-application.service";



@Controller('customers')
export class CustomersController{
    constructor(
        private readonly customerApplicationService: CustomersApplicationService,
        private readonly queryBus: QueryBus
    ){}

    @Post('/person')
    async registerPerson(
      @Body() registerCustomerRequestDto: RegisterCustomerRequestDto,
      @Res({ passthrough: true }) response
    ): Promise<object> {
      try {
        //delego a la capa de aplicacion para realizar las validaciones
        //App Notification -> notificar de los posibles errores q tenga la aplicacion (patron notificacion)
        const result: Result<AppNotification, RegisterCustomerResponseDto> = await this.customerApplicationService.register(registerCustomerRequestDto);
        if (result.isSuccess()) {
            return ApiController.created(response, result.value);
        }
        return ApiController.error(response, result.error.getErrors());
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    }






}