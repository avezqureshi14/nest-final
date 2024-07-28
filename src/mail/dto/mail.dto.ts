import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    text: string;

    @IsString()
    html: string;
}
