import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { OtpDbRepository } from './otp-db.repository';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class OtpDbService {
    private readonly OTP_EXPIRATION_TIME = 50 * 60 * 1000;

    constructor(private otpDbRepository: OtpDbRepository) { }

    async findUserByEmail(email: string) {
        try {
            const user = await this.otpDbRepository.findUserByEmail(email);
            if (!user) {
                throw new BadRequestException(MESSAGES.USER.NOT_FOUND);
            }
            return user;
        } catch (error) {
            console.error(MESSAGES.OTP.FAILED_TO_GET, error);
            throw new InternalServerErrorException(MESSAGES.USER.NOT_FOUND);
        }
    }

    async updateOtp(email: string, otp: string) {
        try {
            const updateResult = await this.otpDbRepository.updateOtp(email, otp);
            if (!updateResult) {
                throw new InternalServerErrorException(MESSAGES.OTP.FAILED_TO_UPDATE);
            }
            return updateResult;
        } catch (error) {
            console.error(MESSAGES.OTP.FAILED_TO_UPDATE, error);
            throw new InternalServerErrorException(MESSAGES.OTP.FAILED_TO_UPDATE);
        }
    }

    async findOtpDetails(email: string) {
        try {
            const otpDetails = await this.otpDbRepository.findOtpDetails(email);

            if (!otpDetails) {
                throw new BadRequestException(MESSAGES.OTP.NOT_FOUND);
            }

            return otpDetails;
        } catch (error) {
            console.error(MESSAGES.OTP.NOT_FOUND, error);
            throw new InternalServerErrorException(MESSAGES.OTP.NOT_FOUND);
        }
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        try {
            const otpDetails = await this.findOtpDetails(email);

            const { otp: storedOtp, otpGeneratedAt } = otpDetails;

            if (storedOtp !== otp) {
                throw new BadRequestException(MESSAGES.OTP.INVALID);
            }
            const currentTime = new Date();
            const otpGenerationTime = new Date(otpGeneratedAt);

            if (currentTime.getTime() - otpGenerationTime.getTime() > this.OTP_EXPIRATION_TIME) {
                throw new BadRequestException(MESSAGES.OTP.EXPIRED);
            }
            return true;
        } catch (error) {
            console.error(MESSAGES.OTP.FAILED_TO_VALIDATE, error);
            throw new InternalServerErrorException(MESSAGES.OTP.FAILED_TO_VALIDATE);
        }
    }
}
