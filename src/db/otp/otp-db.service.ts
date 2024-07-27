import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { OtpDbRepository } from './otp-db.repository';

@Injectable()
export class OtpDbService {
    private readonly OTP_EXPIRATION_TIME = 50 * 60 * 1000;

    constructor(private otpDbRepository: OtpDbRepository) { }

    async findUserByEmail(email: string) {
        try {
            const user = await this.otpDbRepository.findUserByEmail(email);
            if (!user) {
                throw new BadRequestException('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new InternalServerErrorException('Failed to find user by email');
        }
    }

    async updateOtp(email: string, otp: string) {
        try {
            const updateResult = await this.otpDbRepository.updateOtp(email, otp);
            if (!updateResult) {
                throw new InternalServerErrorException('Failed to update OTP in the database');
            }
            return updateResult;
        } catch (error) {
            console.error('Error updating OTP:', error);
            throw new InternalServerErrorException('Failed to update OTP');
        }
    }

    async findOtpDetails(email: string) {
        try {
            const otpDetails = await this.otpDbRepository.findOtpDetails(email);

            if (!otpDetails) {
                throw new BadRequestException('OTP details not found');
            }

            return otpDetails;
        } catch (error) {
            console.error('Error finding OTP details:', error);
            throw new InternalServerErrorException('Failed to find OTP details');
        }
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        try {
            const otpDetails = await this.findOtpDetails(email);

            const { otp: storedOtp, otpGeneratedAt } = otpDetails;

            if (storedOtp !== otp) {
                throw new BadRequestException('Invalid OTP');
            }
            console.log("Not Invalid OTP");
            const currentTime = new Date();
            const otpGenerationTime = new Date(otpGeneratedAt);

            if (currentTime.getTime() - otpGenerationTime.getTime() > this.OTP_EXPIRATION_TIME) {
                throw new BadRequestException('OTP has expired');
            }
            console.log("Not Expired OTP");

            return true;
        } catch (error) {
            console.error('Error validating OTP:', error);
            throw new InternalServerErrorException('Failed to validate OTP');
        }
    }
}
