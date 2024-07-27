import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OtpDbRepository {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }


    async updateOtp(email: string, otp: string) {
        return this.prisma.user.update({
            where: { email },
            data: {
                otp,
                otpGeneratedAt: new Date(),
            },
        });
    }

    async findOtpDetails(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                otp: true,
                otpGeneratedAt: true,
            },
        });
    }
}
