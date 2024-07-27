import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MailModule } from 'src/mail/mail.module';
import { DbModule } from 'src/db/db.module';
@Module({
  imports: [MailModule, DbModule],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule { }
