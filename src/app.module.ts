import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './modules/employee.module';
import { UserModule } from './modules/user.module';
import { CompanyModule } from './modules/company.module';
import { TimeOffModule } from './modules/time-off.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available throughout the application
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/*{.entity.ts,.entity.js}'],
      //migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: true,
      useUTC: true,
    }),
    EmployeeModule,
    UserModule,
    CompanyModule,
    TimeOffModule,
  ],
})
export class AppModule {}
