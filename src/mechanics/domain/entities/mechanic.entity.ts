import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerName } from 'src/common/domain/value-objects/customer-name.value';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { MechanicRegisteredEvent } from '../events/mechanic-registered.event';
import { MechanicAddress } from '../value-objects/mechanic-address.value.dto';
import { MechanicDescription } from '../value-objects/mechanic-description.value';
import { MechanicName } from '../value-objects/mechanic-name.value';


//add values obj
export class Mechanic extends AggregateRoot {
  private id: number;
  private mechanicName: MechanicName;
  private email: Email;
  private password: Password;
  private address: MechanicAddress;
  private description: MechanicDescription;
  
//fix
  public constructor(id: number, mechanicName: MechanicName, email: Email, password: Password, address: MechanicAddress, description: MechanicDescription) {
    super();
    this.id = id;
    this.mechanicName = mechanicName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.description = description;
  }

  //fix
  public register() {
    const event = new MechanicRegisteredEvent(this.id, this.mechanicName.getValue(), this.email.getValue(), this.password.getValue(), this.address.getValue(), this.description.getValue());
    this.apply(event);
  }

  public getId(): number {
    return this.id;
  }
  

  public getMechanicName(): MechanicName {
    return this.mechanicName;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getAddress(): MechanicAddress {
    return this.address;
  }

  public getDescription(): MechanicDescription {
      return this.description;
  }

  public changeId(id: number): void {
    this.id = id;
  }

  public changeMechanicName(mechanicName: MechanicName): void {
    this.mechanicName = mechanicName;
  }

  public changeEmail(email: Email) {
    this.email = email;
  }

  public changePassword(password: Password) {
    this.password = password;
  }

  public changeAddress(address: MechanicAddress) {
    this.address = address;
  }

  public changeDescription(description: MechanicDescription): void {
    this.description = description;
  }
}