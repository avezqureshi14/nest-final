import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftDto } from './dto/shift.dto';

@Controller('shifts')
export class ShiftController {
    constructor(private readonly shiftService: ShiftService) { }

    @Post('/')
    async createShift(@Body() shiftDto: ShiftDto) {
        return this.shiftService.createShift(shiftDto);
    }

    @Get('/')
    async getAllShifts() {
        return this.shiftService.getAllShifts();
    }

    @Get('/details/:id')
    async getShiftById(@Param('id') id: string) {
        return this.shiftService.getShiftById(id);
    }

    @Put('/:id')
    async updateShift(@Param('id') id: string, @Body() shiftDto: ShiftDto) {
        return this.shiftService.updateShift(id, shiftDto);
    }

    @Delete('/:id')
    async deleteShift(@Param('id') id: string) {
        return this.shiftService.deleteShift(id);
    }

    @Get('/search')
    async searchShifts(@Query('query') query: string) {
        return this.shiftService.searchShifts(query);
    }
}
