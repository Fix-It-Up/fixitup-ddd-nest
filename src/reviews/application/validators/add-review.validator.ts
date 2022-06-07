import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { AddReviewRequestDto } from '../dtos/request/add-review-request.dto';
//import { MechanicTypeORM } from '../../../accounts/infrastructure/persistence/typeorm/entities/mechanic.typeorm';

@Injectable()
export class AddReviewValidator {
  constructor(@InjectRepository(MechanicTypeORM) private accountRepository: Repository<MechanicTypeORM>) {}

  public async validate(addReviewRequestDto: AddReviewRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    //description required
    //mechanic id needs to exist
    //customer id needs to exist

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  }
}