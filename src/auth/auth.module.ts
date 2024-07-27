import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from 'src/db/db.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [JwtModule, PassportModule, DbModule, OtpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
