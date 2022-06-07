import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class CustomersApplicationService{
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        //private registerCustomerValidator:  RegisterCustomerValidator
    ){}
}

// async getById(
//     id: number,

// )