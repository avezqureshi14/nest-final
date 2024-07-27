import { Injectable, BadRequestException } from '@nestjs/common';
import { ResponseUtil } from '../auth/helpers/response.util';
import { OtpDbService } from '../db/otp/otp-db.service';
import { MailService } from '../mail/mail.service';
import { generateOtp, storeOtp, sendOtpEmail } from './helpers/helpers'; // Import helper functions

@Injectable()
export class OtpService {
    constructor(
        private readonly otpDbService: OtpDbService,
        private readonly mailService: MailService
    ) { }

    async sendOtp(email: string): Promise<void> {
        const user = await this.otpDbService.findUserByEmail(email);

        if (!user) {
            throw new BadRequestException(ResponseUtil.error('User not found', 400));
        }

        const otp = generateOtp();
        await storeOtp(this.otpDbService, email, otp);
        await sendOtpEmail(this.mailService, email, otp);
    }
}
