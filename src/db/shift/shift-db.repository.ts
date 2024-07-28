import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Assuming PrismaService is set up
import { ShiftDto } from '../../shift/dto/shift.dto';

@Injectable()
export class ShiftDbRepository {

    constructor(private readonly prisma: PrismaService) { }
    createShift(shiftDto: ShiftDto) {

        return this.prisma.shift.create({ data: shiftDto });
    }

    getAllShifts() {
        return this.prisma.shift.findMany();
    }

    getShiftById(id: string) {
        return this.prisma.shift.findUnique({ where: { id } });
    }

    updateShift(id: string, shiftDto: ShiftDto) {
        return this.prisma.shift.update({
            where: { id },
            data: shiftDto,
        });
    }

    deleteShift(id: string) {
        return this.prisma.shift.delete({ where: { id } });
    }

    searchShifts(query: string) {
        return this.prisma.shift.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive', // Case insensitive search
                },
            },
        });
    }
}
