import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthDbRepository {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    // async createUser(email: string, password: string) {
    //     return await this.prisma.user.create({
    //         data: { email, password },
    //     });
    // }

    async updatePassword(email: string, newPassword: string) {
        const updatedUser = await this.prisma.user.update({
            where: { email },
            data: { password: newPassword },
        });
        return updatedUser;
    }
}
