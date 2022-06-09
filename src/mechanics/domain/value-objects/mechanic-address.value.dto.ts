import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { Mechanic } from '../entities/mechanic.entity';

export class MechanicAddress {
  private readonly value: string;
  private static MAX_LENGTH: number = 200;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(address: string): Result<AppNotification, MechanicAddress> {
    let notification: AppNotification = new AppNotification();
    address = (address ?? "").trim();
    if (address === "") {
      notification.addError('address is required', null);
    }
    if (address.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an address is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new MechanicAddress(address));
  }
}