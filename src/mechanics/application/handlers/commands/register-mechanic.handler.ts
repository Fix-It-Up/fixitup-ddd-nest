import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { UserType } from 'src/common/domain/enums/user-type.enum';
import { UserAbstractFactory } from 'src/common/domain/factories/abstract/user-abstract-factory';
import { UserFactoryMethod } from 'src/common/domain/factories/user-factory-method';
import { Email } from 'src/common/domain/value-objects/email.value';
import { Password } from 'src/common/domain/value-objects/password.value';
import { Mechanic } from 'src/mechanics/domain/entities/mechanic.entity';
import { MechanicFactory } from 'src/mechanics/domain/factories/mechanic.factory';
import { MechanicAddress } from 'src/mechanics/domain/value-objects/mechanic-address.value.dto';
import { MechanicDescription } from 'src/mechanics/domain/value-objects/mechanic-description.value';
import { MechanicId } from 'src/mechanics/domain/value-objects/mechanic-id.value';
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
        let mechanicId: MechanicId = MechanicId.create(0);
        //add mechanic name
        const mechanicNameResult: Result<AppNotification, MechanicName> = MechanicName.create(
            command.mechanicName
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

        const userFactory: UserAbstractFactory = UserFactoryMethod.getType(UserType.MECHANIC);

        let mechanic: Mechanic = userFactory.createFrom({
            mechanicName: mechanicNameResult.value,
            email: emailResult.value,
            password: passwordResult.value, 
            address: addressResult.value, 
            description: descriptionResult.value});
        let mechanicTypeORM: MechanicTypeORM = MechanicMapper.toTypeORM(mechanic);
        mechanicTypeORM = await this.mechanicRepository.save(mechanicTypeORM);
        if (mechanicTypeORM == null) {
          return mechanicId;
        }
        //keep an eye here
        mechanicId = MechanicId.create(mechanicTypeORM.id.value);
        mechanic.changeMechanicId(mechanicId);
        mechanic = this.publisher.mergeObjectContext(mechanic);
        mechanic.register();
        mechanic.commit();
        return mechanicId;
    }












        
}