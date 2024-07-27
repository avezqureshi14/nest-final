import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AuthDbRepository } from './auth-db.repository';

@Injectable()
export class AuthDbService {
    constructor(private authDbRepository: AuthDbRepository) { }

    async findUserByEmail(email: string) {
        try {
            const user = await this.authDbRepository.findUserByEmail(email);
            return user || null;
        } catch (error) {
            throw new InternalServerErrorException('Failed to find user by email');
        }
    }



    async createUser(email: string, password: string) {
        try {
            return await this.authDbRepository.createUser(email, password);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async updatePassword(email: string, newPassword: string) {
        try {
            return await this.authDbRepository.updatePassword(email, newPassword);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update password');
        }
    }
}
