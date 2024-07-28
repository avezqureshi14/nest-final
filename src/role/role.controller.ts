import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ResponseUtil } from '../common/response/response.util';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post('/')
    async createRole(@Body() dto: RoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/')
    async getRoles() {
        return this.roleService.getRoles();
    }

    @Put('/:id')
    async updateRole(@Param('id') id: string, @Body() dto: RoleDto) {
        return this.roleService.updateRole(id, dto);
    }

    @Delete('/:id')
    async deleteRole(@Param('id') id: string) {
        return this.roleService.deleteRole(id);
    }
}
