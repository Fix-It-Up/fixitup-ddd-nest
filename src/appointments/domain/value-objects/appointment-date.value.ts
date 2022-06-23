import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { Res } from '@nestjs/common';

export class AppointmentDate {
  private date: string;
  private static MAX_LENGTH: number = 10;

  private constructor(date: string) {
    this.date = date;
  }

  public static create(date: string): Result<AppNotification, AppointmentDate> {
    let notification: AppNotification = new AppNotification();

    date = (date ?? "").trim();
    if (date == '') {
      notification.addError('Date is required', null);
    }
    if (date.length > this.MAX_LENGTH) {
      notification.addError('Invalid Date. You must provide ' + this.MAX_LENGTH + ' characters', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new AppointmentDate(date));
  }

  public static from(date: string) {
    return new AppointmentDate(
      date
    );
  }
  public static of(day: number, month: number, year: number) {
    return new AppointmentDate(`${day}/${month}/${year}`);
  }
  
  public getDate() {
    return this.date;
  }
}