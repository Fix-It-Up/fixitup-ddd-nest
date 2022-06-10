import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator'
import { IEventHandler } from '@nestjs/cqrs';
import { MechanicRegisteredEvent } from 'src/mechanics/domain/events/mechanic-registered.event';

@EventsHandler(MechanicRegisteredEvent)
export class MechanicRegisteredHandler
  implements IEventHandler<MechanicRegisteredEvent>
{
  constructor() {}

  handle(event: MechanicRegisteredEvent) {
    console.log(event);
  }
}