import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { MechanicsModule } from './mechanics/mechanics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: process.env.FIXITUP_DDD_NEST_MYSQL,
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: ['dist/**/infrastructure/persistence/typeorm/entities/*{.ts,.js}'],
      subscribers: [],
      migrations: ['dist/common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}'],
      migrationsTableName: "migrations"
    }),
    CustomersModule,
    MechanicsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
