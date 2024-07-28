import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/')
    async createUser(@Body() dto: UserDto) {
        return this.usersService.createUser(dto);
    }

    @Get('/')
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Get('/details/:id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() data: UserDto) {
        return this.usersService.updateUser(id, data);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

    @Get('/search')
    async searchShifts(@Query('query') query: string) {
        return this.usersService.searchUsers(query);
    }

    @Get('/shifts/:shiftId')
    async filterUsersByShift(@Param('shiftId') shiftId: string) {
        return this.usersService.filterUsersByShift(shiftId);
    }
}
