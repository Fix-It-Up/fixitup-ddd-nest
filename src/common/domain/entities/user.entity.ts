import { AggregateRoot } from '@nestjs/cqrs';
import { UserType } from '../enums/user-type.enum';
import { Email } from '../value-objects/email.value';

export class User extends AggregateRoot {
  protected email: Email;
  protected type: UserType;

  public constructor(email: Email, type: UserType) {
    super();
    this.email = email;
    this.type = type;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getType(): UserType {
    return this.type;
  }

  public changeEmail(email: Email) {
    this.email = email;
  }
}