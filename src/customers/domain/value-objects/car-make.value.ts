import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

export class CarMake {
  private readonly value: string;
  private static MAX_LENGTH: number = 20;

  private constructor(value: string) {
    this.value = value;
  }


  public static create(carMake: string): Result<AppNotification, CarMake> {
    let notification: AppNotification = new AppNotification();
    carMake = (carMake ?? "").trim();
    if (carMake === "") {
      notification.addError('carMake is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new CarMake(carMake));
  }

  public getValue(): string {
    return this.value;
  }
}