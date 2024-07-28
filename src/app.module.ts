import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DbModule } from './db/db.module';
import { EnvConfigModule } from './common/config/env-config.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';
import { ShiftModule } from './shift/shift.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
@Module({
  imports: [EnvConfigModule, AuthModule, PrismaModule, DbModule, OtpModule, MailModule, ShiftModule, UsersModule, RoleModule],
  providers: [],
  controllers: [],
})
export class AppModule { }
