import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { RegisterCustomerResponseDto } from "../application/dtos/response/register-customer-response.dto";
import { GetCustomersQuery } from "../application/queries/get-customers.query";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomersApplicationService } from "../application/services/customer-application.service";
import { GetCustomersDto } from "../application/dtos/queries/get-customers.dto";

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController{
    constructor(
        private readonly customerApplicationService: CustomersApplicationService,
        private readonly queryBus: QueryBus
    ){}

    @ApiOperation({ summary: 'Create new Customer' })
    @ApiResponse({
      status: 201,
      description: 'Customer created',
      type: GetCustomersDto,
    })
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

    @ApiOperation({ summary: 'Get All Customers' })
    @ApiResponse({
      status: 200,
      description: 'All customers returned',
      type: GetCustomersDto,
      isArray: true,
    })
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