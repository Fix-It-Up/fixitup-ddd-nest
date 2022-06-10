import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class MechanicDescription {
  private readonly value: string;
  private static MAX_LENGTH: number = 200;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(mechanicDescription: string): Result<AppNotification, MechanicDescription> {
    let notification: AppNotification = new AppNotification();
    mechanicDescription = (mechanicDescription ?? "").trim();
    if (mechanicDescription === "") {
      notification.addError('description is required', null);
    }
    if (mechanicDescription.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a description is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new MechanicDescription(mechanicDescription));
  }
}