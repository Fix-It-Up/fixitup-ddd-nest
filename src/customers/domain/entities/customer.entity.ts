import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { CustomerRegisteredEvent } from '../events/customer-registered.event';
import { CarMake } from '../value-objects/car-make.value';
import { CustomerId } from '../value-objects/customer-id.value';

export class Customer extends AggregateRoot {
  private id: CustomerId;
  private name: CustomerName;
  private email: Email;
  private password: Password;
  private carMake: CarMake;
  

  public constructor(id: CustomerId, name: CustomerName, email: Email, password: Password, carMake: CarMake) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.carMake = carMake;
  }

  public register() {
    const event = new CustomerRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.email.getValue(), this.password.getValue(), this.carMake.getValue());
    this.apply(event);
  }

  public getCustomerId(): CustomerId {
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

  public getCarMake(): CarMake {
    return this.carMake;
  }

  public changeCustomerId(id: CustomerId): void {
    this.id = id;
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

  public changeCarMake(carMake: CarMake): void {
    this.carMake = carMake;
  }

}