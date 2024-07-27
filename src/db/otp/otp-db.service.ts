import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { OtpDbRepository } from './otp-db.repository';

@Injectable()
export class OtpDbService {
    constructor(private otpRepository: OtpDbRepository) {

    }

    async generateAndStoreOtp(email: string): Promise<string> {
        // Generate 6-digit OTP
        const otp = randomInt(100000, 999999).toString();

        // Store OTP in the database
        await this.otpRepository.storeOtp(email, otp);

        return otp;
    }

}
