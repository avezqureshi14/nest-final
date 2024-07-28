import { IsString, IsEmail, IsOptional, IsUUID, MinLength } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsUUID()
    roleId: string;

    @IsUUID()
    shiftId: string;

    @IsOptional()
    @IsString()
    otp?: string;

    @IsOptional()
    otpGeneratedAt?: Date;
}
