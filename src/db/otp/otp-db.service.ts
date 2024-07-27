import { Injectable } from '@nestjs/common';
import { OtpDbRepository } from './otp-db.repository';

@Injectable()
export class OtpDbService {
    constructor(private otpDbRepository: OtpDbRepository) { }

    async findUserByEmail(email: string) {
        return this.otpDbRepository.findUserByEmail(email);
    }

    async updateOtp(email: string, otp: string) {
        return this.otpDbRepository.updateOtp(email, otp);
    }
}
