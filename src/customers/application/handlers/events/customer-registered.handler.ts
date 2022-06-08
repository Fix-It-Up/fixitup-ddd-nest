import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator'
import { IEventHandler } from '@nestjs/cqrs';
import { CustomerRegisteredEvent } from 'src/customers/domain/events/customer-registered.event';

@EventsHandler(CustomerRegisteredEvent)
export class CustomerRegisteredHandler
  implements IEventHandler<CustomerRegisteredEvent>
{
  constructor() {}

  handle(event: CustomerRegisteredEvent) {
    console.log(event);
  }
}