import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpDbRepository {
    constructor(private prisma: PrismaService) { }

    async storeOtp(email: string, otp: string): Promise<void> {
        await this.prisma.user.update({
            where: { email },
            data: { otp },
        });
    }
}
