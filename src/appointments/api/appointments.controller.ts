import { Body, Controller, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";



@Controller('appointments')
export class AppointmentsController{

    constructor(private readonly queryBus: QueryBus){}

    // @Post()
    // async register(
    // )
}