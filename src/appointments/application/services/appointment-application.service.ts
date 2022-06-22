import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

//@Injectable
export class AppointmentApplicationService{
    constructor(
        private commandBus: CommandBus,
        
    ){}
}