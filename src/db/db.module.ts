import { Module } from '@nestjs/common';
import { AuthDbService } from './auth/auth-db.service';
import { AuthDbRepository } from './auth/auth-db.repository';
import { OtpDbService } from './otp/otp-db.service';
import { OtpDbRepository } from './otp/otp-db.repository';
@Module({
    controllers: [],
    providers: [AuthDbService, AuthDbRepository, OtpDbService, OtpDbRepository],
    exports: [AuthDbService, AuthDbRepository, OtpDbService, OtpDbRepository]
})
export class DbModule { }
