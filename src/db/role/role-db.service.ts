// src/role/role-db.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RoleDbRepository } from './role-db.repository';
import { Role } from '@prisma/client';
import { RoleDto } from '../../role/dto/role.dto';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class RoleDbService {
    constructor(private readonly roleDbRepository: RoleDbRepository) { }

    async createRole(dto: RoleDto): Promise<Role> {
        try {
            return await this.roleDbRepository.createRole(dto);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.ROLE.FAILED_TO_CREATE);
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            return await this.roleDbRepository.getRoles();
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.ROLE.FAILED_TO_GET);
        }
    }

    async getRoleById(id: string): Promise<Role> {
        try {
            const role = await this.roleDbRepository.getRoleById(id);
            if (!role) {
                throw new NotFoundException(MESSAGES.ROLE.NOT_FOUND);
            }
            return role;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.ROLE.FAILED_TO_GET);
        }
    }

    async updateRole(id: string, dto: RoleDto): Promise<Role> {
        await this.getRoleById(id);
        try {
            const role = await this.roleDbRepository.updateRole(id, dto);
            if (!role) {
                throw new NotFoundException(MESSAGES.ROLE.NOT_FOUND);
            }
            return role;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.ROLE.FAILED_TO_UPDATE);
        }
    }

    async deleteRole(id: string): Promise<Role> {
        await this.getRoleById(id);
        try {
            const role = await this.roleDbRepository.deleteRole(id);
            if (!role) {
                throw new NotFoundException(MESSAGES.ROLE.NOT_FOUND);
            }
            return role;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.ROLE.FAILED_TO_DELETE);
        }
    }
}
