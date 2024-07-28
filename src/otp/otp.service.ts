import { Injectable, BadRequestException } from '@nestjs/common';
import { ResponseUtil } from '../common/response/response.util';
import { OtpDbService } from '../db/otp/otp-db.service';
import { MailService } from '../mail/mail.service';
import { generateOtp, storeOtp, sendOtpEmail } from './helpers/helpers';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class OtpService {
    constructor(
        private readonly otpDbService: OtpDbService,
        private readonly mailService: MailService
    ) { }

    async sendOtp(email: string): Promise<void> {
        const user = await this.otpDbService.findUserByEmail(email);

        if (!user) {
            throw new BadRequestException(ResponseUtil.error(MESSAGES.USER.NOT_FOUND, 400));
        }

        const otp = generateOtp();
        await storeOtp(this.otpDbService, email, otp);
        await sendOtpEmail(this.mailService, email, otp);
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        return await this.otpDbService.validateOtp(email, otp);
    }
}
