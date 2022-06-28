import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { RegisterCustomerResponseDto } from "../application/dtos/response/register-customer-response.dto";
import { GetCustomersQuery } from "../application/queries/get-customers.query";
import { CustomersApplicationService } from "../application/services/customer-application.service";

@Controller('customers')
export class CustomersController{
    constructor(
        private readonly customerApplicationService: CustomersApplicationService,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async register(
      @Body() registerCustomerRequestDto: RegisterCustomerRequestDto,
      @Res({ passthrough: true }) response
    ): Promise<object> {
      try {
        const result: Result<AppNotification, RegisterCustomerResponseDto> = await this.customerApplicationService.register(registerCustomerRequestDto);
        if (result.isSuccess()) {
            return ApiController.created(response, result.value);
        }
        return ApiController.error(response, result.error.getErrors());
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    }

    @Get()
    async getCustomers(@Res({ passthrough: true }) response): Promise<object> {
      try {
        const customers = await this.queryBus.execute(new GetCustomersQuery());
        return ApiController.ok(response, customers);
      } catch (error) {
        return ApiController.serverError(response, error);
      }
    }
}