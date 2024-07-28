import { Module } from '@nestjs/common';
import { AuthDbService } from './auth/auth-db.service';
import { AuthDbRepository } from './auth/auth-db.repository';
import { OtpDbService } from './otp/otp-db.service';
import { OtpDbRepository } from './otp/otp-db.repository';
import { ShiftDbService } from './shift/shift-db.service';
import { ShiftDbRepository } from './shift/shift-db.repository';
import { RoleDbService } from './role/role-db.service';
import { RoleDbRepository } from './role/role-db.repository';
import { UsersDbRepository } from './users/users-db.repository';
import { UsersDbService } from './users/users-db.service';
@Module({
    controllers: [],
    providers: [AuthDbService, AuthDbRepository, OtpDbService, OtpDbRepository, ShiftDbService, ShiftDbRepository, RoleDbService, RoleDbRepository, UsersDbService, UsersDbRepository],
    exports: [AuthDbService, AuthDbRepository, OtpDbService, OtpDbRepository, ShiftDbService, ShiftDbRepository, RoleDbService, RoleDbRepository, UsersDbService, UsersDbRepository]
})
export class DbModule { }
