import { randomInt } from 'crypto';
import { ResponseUtil } from './response.util';
import { InternalServerErrorException } from '@nestjs/common';

export function generateOtp(): string {
    return randomInt(100000, 999999).toString();
}

export async function storeOtp(otpDbService: any, email: string, otp: string): Promise<void> {
    try {
        await otpDbService.updateOtp(email, otp);
    } catch (error) {
        throw new InternalServerErrorException(ResponseUtil.error('Failed to store OTP', 500));
    }
}

export async function sendOtpEmail(mailService: any, email: string, otp: string): Promise<void> {
    const subject = process.env.OTP_EMAIL_SUBJECT || 'Your OTP for Password Reset';
    const text = process.env.OTP_EMAIL_TEXT?.replace('{otp}', otp) || `Your OTP is ${otp}`;
    const html = process.env.OTP_EMAIL_HTML?.replace('{otp}', otp) || `<strong>Your OTP is ${otp}</strong>`;

    try {
        await mailService.sendMail(email, subject, text, html);
    } catch (error) {
        throw new InternalServerErrorException(ResponseUtil.error('Failed to send OTP email', 500));
    }
}

