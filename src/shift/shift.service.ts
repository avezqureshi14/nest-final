import { Injectable } from '@nestjs/common';
import { ShiftDbService } from '../db/shift/shift-db.service';
import { ShiftDto } from './dto/shift.dto';
import { ResponseUtil } from '../common/response/response.util';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class ShiftService {
    constructor(private readonly shiftDbService: ShiftDbService) { }

    async createShift(shiftDto: ShiftDto) {
        const shift = await this.shiftDbService.createShift(shiftDto);
        return ResponseUtil.success(shift, MESSAGES.SHIFT.CREATED);
    }

    async getAllShifts() {
        const shifts = await this.shiftDbService.getAllShifts();
        return ResponseUtil.success(shifts, MESSAGES.SHIFT.FETCHED);
    }

    async getShiftById(id: string) {
        const shift = await this.shiftDbService.getShiftById(id);
        return shift
            ? ResponseUtil.success(shift, MESSAGES.SHIFT.FETCHED)
            : ResponseUtil.error(MESSAGES.SHIFT.NOT_FOUND, 404);
    }

    async updateShift(id: string, shiftDto: ShiftDto) {
        const shift = await this.shiftDbService.updateShift(id, shiftDto);
        return ResponseUtil.success(shift, MESSAGES.SHIFT.UPDATED);
    }

    async deleteShift(id: string) {
        await this.shiftDbService.deleteShift(id);
        return ResponseUtil.success(null, MESSAGES.SHIFT.DELETED);
    }

    async searchShifts(query: string) {
        const shifts = await this.shiftDbService.searchShifts(query);
        return ResponseUtil.success(shifts, MESSAGES.SHIFT.FETCHED);
    }
}
