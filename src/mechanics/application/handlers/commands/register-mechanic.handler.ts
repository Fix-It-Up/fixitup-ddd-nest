import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Mechanic } from 'src/mechanics/domain/entities/mechanic.entity';
import { MechanicFactory } from 'src/mechanics/domain/factories/mechanic.factory';
import { MechanicAddress } from 'src/mechanics/domain/value-objects/mechanic-address.value.dto';
import { MechanicDescription } from 'src/mechanics/domain/value-objects/mechanic-description.value';
import { MechanicName } from 'src/mechanics/domain/value-objects/mechanic-name.value';
import { MechanicTypeORM } from 'src/mechanics/infrastructure/persistence/typeorm/entities/mechanic.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { RegisterMechanicCommand } from '../../commands/register-mechanic.command';
import { MechanicMapper } from '../../mappers/mechanic.mapper';

@CommandHandler(RegisterMechanicCommand)
export class RegisterMechanicHandler implements ICommandHandler<RegisterMechanicCommand> {
    constructor(
        //create repositories
        @InjectRepository(MechanicTypeORM)
        private mechanicRepository: Repository<MechanicTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterMechanicCommand) {
        let mechanicId: number = 0;
        //add mechanic name
        const mechanicNameResult: Result<AppNotification, MechanicName> = MechanicName.create(
            command.name
        );
        
        if(mechanicNameResult.isFailure()){
            return 0;
        }

        const emailResult: Result<AppNotification, Email> = Email.create(
            command.email,
        );

        if(emailResult.isFailure()){
            return 0;
        }

        const passwordResult: Result<AppNotification, Password> = Password.create(
            command.password,
        );
      
        if (passwordResult.isFailure()) {
            return 0;
        }

        const addressResult: Result<AppNotification, MechanicAddress> = MechanicAddress.create(command.address);
        if (addressResult.isFailure()) {
            return 0;
        }

        const descriptionResult: Result<AppNotification, MechanicDescription> = MechanicDescription.create(command.description);
        if (descriptionResult.isFailure()) {
            return 0;
        }

        let mechanic: Mechanic = MechanicFactory.createFrom(mechanicId, mechanicNameResult.value, emailResult.value, passwordResult.value, addressResult.value, descriptionResult.value);
        let mechanicTypeORM: MechanicTypeORM = MechanicMapper.toTypeORM(mechanic);
        mechanicTypeORM = await this.mechanicRepository.save(mechanicTypeORM);
        if (mechanicTypeORM == null) {
          return mechanicId;
        }
        mechanicId = Number(mechanicTypeORM.id);
        mechanic.changeId(mechanicId);
        mechanic = this.publisher.mergeObjectContext(mechanic);
        mechanic.register();
        mechanic.commit();
        return mechanicId;
    }












        
}