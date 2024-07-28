import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { UsersDbRepository } from './users-db.repository';
import { User, Prisma } from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';
import { MESSAGES } from 'src/common/response/response-messages';
import { hashPassword } from 'src/auth/helpers/auth.helpers';

@Injectable()
export class UsersDbService {
    constructor(private readonly usersDbRepository: UsersDbRepository) { }

    async createUser(dto: UserDto): Promise<User> {
        try {
            const existingUser = await this.usersDbRepository.findUserByEmail(dto.email);
            if (existingUser) {
                throw new ConflictException(MESSAGES.USER.EMAIL_ERROR);
            }

            // Hash the password before saving the user
            const hashedPassword = await hashPassword(dto.password);
            const userData = {
                ...dto,
                password: hashedPassword,
            };

            return await this.usersDbRepository.createUser(userData);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_CREATE);
        }
    }
    async getUsers(): Promise<User[]> {
        try {
            return await this.usersDbRepository.getUsers();
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.usersDbRepository.getUserById(id);
            if (!user) {
                throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
        }
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        await this.getUserById(id);
        try {
            const user = await this.usersDbRepository.updateUser(id, data);
            if (!user) {
                throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_UPDATE);
        }
    }

    async deleteUser(id: string): Promise<User> {
        await this.getUserById(id);
        try {
            const user = await this.usersDbRepository.deleteUser(id);
            if (!user) {
                throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_DELETE);
        }
    }

    async searchUsers(query: string) {
        try {
            return await this.usersDbRepository.searchUsers(query);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
        }
    }

    async filterUsersByShift(id: string) {
        try {
            return await this.usersDbRepository.filterUsersByShift(id);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
        }
    }
}
