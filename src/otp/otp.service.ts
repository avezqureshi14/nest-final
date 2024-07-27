import { Injectable, BadRequestException } from '@nestjs/common';
import { OtpDbService } from '../db/otp/otp-db.service';
import { AuthDbService } from '../db/auth/auth-db.service';
import * as sgMail from '@sendgrid/mail';


@Injectable()
export class OtpService {
    constructor(private otpDbService: OtpDbService,
        private authDbService: AuthDbService,
    ) { sgMail.setApiKey(process.env.SENDGRID_API_KEY); }

    async sendOtp(email: string): Promise<void> {
        // Check if user exists
        const user = await this.authDbService.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Generate and store OTP
        const otp = await this.otpDbService.generateAndStoreOtp(email);

        // Send OTP to user's email using SendGrid
        const msg = {
            to: email,
            from: `${process.env.SENDGRID_EMAIL}`,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP is ${otp}`,
            html: `<strong>Your OTP is ${otp}</strong>`,
        };

        await sgMail.send(msg);
    }
}
