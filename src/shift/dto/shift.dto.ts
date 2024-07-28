import { IsNotEmpty, IsString, IsEmail, Length, IsISO8601 } from 'class-validator';

export class ShiftDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    public start_time: string;

    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    public end_time: string;
}
