import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './modules/employee.module';
import { UserModule } from './modules/user.module';
import { CompanyModule } from './modules/company.module';
import { TimeOffModule } from './modules/time-off.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'employee_db',
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
