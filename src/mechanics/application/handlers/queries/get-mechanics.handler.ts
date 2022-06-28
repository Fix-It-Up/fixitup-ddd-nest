import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetMechanicsQuery } from '../../queries/get-mechanics.query';
import { GetMechanicsDto } from '../../dtos/queries/get-mechanics.dto';

@QueryHandler(GetMechanicsQuery)
export class GetMechanicsHandler implements IQueryHandler<GetMechanicsQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetMechanicsQuery) {
    const manager = this.dataSource.createEntityManager();

    const sql = `
    SELECT 
        id,
        mechanic_name,
        email,
        password,
        address,
        description
    FROM
        mechanics
    `;

    const ormMechanics = await manager.query(sql);

    if (ormMechanics.length <= 0) {
      return [];
    }

    const mechanics: GetMechanicsDto[] = ormMechanics.map(function (
      ormMechanic
    ) {
      let mechanicDto = new GetMechanicsDto();
      mechanicDto.id = Number(ormMechanic.id);
      mechanicDto.mechanicName = ormMechanic.mechanicName;
      mechanicDto.email = ormMechanic.email;
      mechanicDto.password = ormMechanic.password;
      mechanicDto.address = ormMechanic.address;
      mechanicDto.description = ormMechanic.description;
      return mechanicDto;
    });

    return mechanics;
  }
}