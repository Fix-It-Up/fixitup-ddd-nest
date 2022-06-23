import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetAppointmentsQuery } from '../../queries/get-appointments.query';
import { GetAppointmentsDto } from '../../dtos/queries/get-appointment.dto';

@QueryHandler(GetAppointmentsQuery)
export class GetAppointmentsHandler implements IQueryHandler<GetAppointmentsQuery> {
  constructor() {}

  async execute(query: GetAppointmentsQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        customer_id as customerId,
        mechanic_id as mechanicId,
        status,
        type,
        date,
        amount
    FROM
        appointments
    `;

    const ormAppointments = await manager.query(sql);

    if (ormAppointments.length <= 0) {
      return [];
    }

    const appointments: GetAppointmentsDto[] = ormAppointments.map(function (
      ormAppointment,
    ) {
      const appointmentDto = new GetAppointmentsDto();
      appointmentDto.id = Number(ormAppointment.id);
      appointmentDto.customerId = ormAppointment.customerId;
      appointmentDto.mechanicId = ormAppointment.mechanicId;
      appointmentDto.status = ormAppointment.status;
      appointmentDto.type = ormAppointment.type;
      appointmentDto.date = ormAppointment.date;
      appointmentDto.amount = ormAppointment.amount
      return appointmentDto;
    });

    return appointments;
  }
}