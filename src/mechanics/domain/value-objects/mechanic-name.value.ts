import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class MechanicName {
  private readonly value: string;
  private static MAX_LENGTH: number = 150;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(mechanicName: string): Result<AppNotification, MechanicName> {
    let notification: AppNotification = new AppNotification();
    mechanicName = (mechanicName ?? "").trim();
    if (mechanicName === "") {
      notification.addError('name is required', null);
    }
    if (mechanicName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new MechanicName(mechanicName));
  }
}