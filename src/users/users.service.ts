import { Injectable } from '@nestjs/common';
import { UsersDbService } from '../db/users/users-db.service';
import { Prisma, User } from '@prisma/client';
import { ResponseUtil } from '../common/response/response.util';
import { UserDto } from './dto/user.dto';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class UsersService {
    constructor(private readonly usersDbService: UsersDbService) { }

    async createUser(dto: UserDto) {
        const user = await this.usersDbService.createUser(dto);
        return ResponseUtil.success(user, MESSAGES.USER.CREATED);
    }

    async getUsers() {
        const users = await this.usersDbService.getUsers();
        return ResponseUtil.success(users, MESSAGES.USER.FETCHED);
    }

    async getUserById(id: string) {
        const user = await this.usersDbService.getUserById(id);
        return user
            ? ResponseUtil.success(user, MESSAGES.USER.FETCHED)
            : ResponseUtil.error('User not found', 404);
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        const user = await this.usersDbService.updateUser(id, data);
        return ResponseUtil.success(user, MESSAGES.USER.UPDATED);
    }

    async deleteUser(id: string) {
        await this.usersDbService.deleteUser(id);
        return ResponseUtil.success(null, MESSAGES.USER.DELETED);
    }

    async searchUsers(query: string) {
        const shifts = await this.usersDbService.searchUsers(query);
        return ResponseUtil.success(shifts, MESSAGES.USER.FETCHED);
    }

    async filterUsersByShift(id: string) {
        const users = await this.usersDbService.filterUsersByShift(id);
        return ResponseUtil.success(users, MESSAGES.USER.FETCHED);
    }
}
