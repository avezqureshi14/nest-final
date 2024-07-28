import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ShiftDbRepository } from './shift-db.repository';
import { ShiftDto } from '../../shift/dto/shift.dto';
import { MESSAGES } from 'src/common/response/response-messages';

@Injectable()
export class ShiftDbService {
    constructor(private readonly shiftDbRepository: ShiftDbRepository) { }

    async createShift(shiftDto: ShiftDto) {
        try {
            return await this.shiftDbRepository.createShift(shiftDto);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_CREATE);
        }
    }

    async getAllShifts() {
        try {
            return await this.shiftDbRepository.getAllShifts();
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_GET);
        }
    }

    async getShiftById(id: string) {
        try {
            const shift = await this.shiftDbRepository.getShiftById(id);
            if (!shift) {
                throw new NotFoundException(MESSAGES.SHIFT.NOT_FOUND);
            }
            return shift;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_GET);
        }
    }

    async updateShift(id: string, shiftDto: ShiftDto) {
        await this.getShiftById(id);
        try {
            return await this.shiftDbRepository.updateShift(id, shiftDto);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_UPDATE);
        }
    }

    async deleteShift(id: string) {
        await this.getShiftById(id);
        try {
            await this.shiftDbRepository.deleteShift(id);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_DELETE);
        }
    }

    async searchShifts(query: string) {
        try {
            return await this.shiftDbRepository.searchShifts(query);
        } catch (error) {
            throw new InternalServerErrorException(MESSAGES.SHIFT.FAILED_TO_GET);
        }
    }
}
