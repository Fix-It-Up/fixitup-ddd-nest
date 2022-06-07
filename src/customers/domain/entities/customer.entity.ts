import { AggregateRoot } from '@nestjs/cqrs';
import { User } from 'src/common/domain/entities/user.entity';
import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { CustomerRegisteredEvent } from '../events/customer-registered.event';
import { CustomerId } from '../value-objects/customer-id.value';

export class Customer extends AggregateRoot {
  private id: CustomerId;
  private name: CustomerName;
  private email: Email;
  private password: Password;
  private carMake: string;
  

  public constructor(id: CustomerId, name: CustomerName, email: Email, password: Password, carMake: string) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.carMake = carMake;
  }

  public register() {
    const event = new CustomerRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.email.getValue(), this.password.getValue(), this.carMake);
    this.apply(event);
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getName(): CustomerName {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getCarMake(): string {
    return this.carMake;
  }

  public changeName(name: CustomerName): void {
    this.name = name;
  }

  public changeEmail(email: Email) {
    this.email = email;
  }

  public changePassword(password: Password) {
    this.password = password;
  }

  public changeCarMake(carMake: string): void {
    this.carMake = carMake;
  }

}