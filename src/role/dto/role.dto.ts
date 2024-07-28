import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

}
