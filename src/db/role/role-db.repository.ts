import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';
import { RoleDto } from '../../role/dto/role.dto';

@Injectable()
export class RoleDbRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createRole(dto: RoleDto): Promise<Role> {
        return this.prisma.role.create({
            data: {
                name: dto.name,
            },
        });
    }

    async getRoles(): Promise<Role[]> {
        return this.prisma.role.findMany();
    }

    async getRoleById(id: string): Promise<Role> {
        return this.prisma.role.findUnique({ where: { id } });
    }

    async updateRole(id: string, dto: RoleDto): Promise<Role> {
        return this.prisma.role.update({
            where: { id },
            data: {
                name: dto.name,
            },
        });
    }

    async deleteRole(id: string): Promise<Role> {
        return this.prisma.role.delete({
            where: { id },
        });
    }
}
