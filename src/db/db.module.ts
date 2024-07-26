import { Module } from '@nestjs/common';
import { AuthDbService } from './auth/auth-db.service';
import { AuthDbRepository } from './auth/auth-db.repository';

@Module({
    controllers: [],
    providers: [AuthDbService, AuthDbRepository],
    exports: [AuthDbService, AuthDbRepository]
})
export class DbModule { }
