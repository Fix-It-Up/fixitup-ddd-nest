import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator'
import { IEventHandler } from '@nestjs/cqrs';
import { CustomerRegisteredEvent } from 'src/customers/domain/events/customer-registered.event';

@EventsHandler(MechanicRegisteredEvent)
export class MechanicRegisteredHandler
  implements IEventHandler<MechanicRegisteredEvent>
{
  constructor() {}

  handle(event: MechanicRegisteredEvent) {
    console.log(event);
  }
}