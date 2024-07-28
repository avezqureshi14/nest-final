import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UsersDbRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: UserDto): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany({
            include: {
                role: true,
                shift: true,
            },
        });

    }

    async getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async searchUsers(query: string) {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: query,
                            mode: 'insensitive', // Case insensitive search
                        },
                    },
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive', // Case insensitive search
                        },
                    },
                ],
            },
        });
    }

    async filterUsersByShift(shiftId: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                shiftId: shiftId,
            },
            include: {
                role: true,
                shift: true,
            },
        });
    }

}
