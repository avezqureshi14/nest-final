import { Injectable } from '@nestjs/common';
import { AuthDbRepository } from './auth-db.repository';
import { AuthDto } from '../../auth/dto/auth.dto';

@Injectable()
export class AuthDbService {
    constructor(private authDbRepository: AuthDbRepository) { }

    async findUserByEmail(email: string) {
        return await this.authDbRepository.findUserByEmail(email);
    }

    async createUser(email: string, password: string) {
        return await this.authDbRepository.createUser(email, password);
    }

}
