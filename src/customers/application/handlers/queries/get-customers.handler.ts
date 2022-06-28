import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetCustomersQuery } from '../../queries/get-customers.query';
import { GetCustomersDto } from '../../dtos/queries/get-customers.dto';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetCustomersQuery) {
    const manager = this.dataSource.createEntityManager();

    const sql = `
    SELECT 
        id,
        last_name as lastName,
        first_name as firstName,
        email,
        password,
        car_make as carMake
    FROM
        customers
    `;

    const ormCustomers = await manager.query(sql);

    if (ormCustomers.length <= 0) {
      return [];
    }

    const customers: GetCustomersDto[] = ormCustomers.map(function (
      ormCustomer
    ) {
      let customerDto = new GetCustomersDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.firstName = ormCustomer.firstName;
      customerDto.lastName = ormCustomer.lastName;
      customerDto.email = ormCustomer.email;
      customerDto.password = ormCustomer.password;
      customerDto.carMake = ormCustomer.carMake;
      return customerDto;
    });

    return customers;
  }
}