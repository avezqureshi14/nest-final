// src/role/role.service.ts
import { Injectable } from '@nestjs/common';
import { RoleDbService } from '../db/role/role-db.service';
import { RoleDto } from './dto/role.dto';
import { ResponseUtil } from '../common/response/response.util';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class RoleService {
    constructor(private readonly roleDbService: RoleDbService) { }

    async createRole(dto: RoleDto) {
        const role = await this.roleDbService.createRole(dto);
        return ResponseUtil.success(role, MESSAGES.ROLE.CREATED);
    }

    async getRoles() {
        const roles = await this.roleDbService.getRoles();
        return ResponseUtil.success(roles, MESSAGES.ROLE.FETCHED);
    }

    async getRoleById(id: string) {
        const role = await this.roleDbService.getRoleById(id);
        return role
            ? ResponseUtil.success(role, MESSAGES.ROLE.FETCHED)
            : ResponseUtil.error(MESSAGES.ROLE.NOT_FOUND, 404);
    }

    async updateRole(id: string, dto: RoleDto) {
        const role = await this.roleDbService.updateRole(id, dto);
        return ResponseUtil.success(role, MESSAGES.ROLE.UPDATED);
    }

    async deleteRole(id: string) {
        await this.roleDbService.deleteRole(id);
        return ResponseUtil.success(null, MESSAGES.ROLE.DELETED);
    }
}
