import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ShiftController],
  providers: [ShiftService]
})
export class ShiftModule { }
