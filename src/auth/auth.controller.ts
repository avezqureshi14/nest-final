import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ForgotPasswordDto } from './dto/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    const result = await this.authService.signup(dto);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const result = await this.authService.signin(dto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    await this.authService.forgotPassword(forgotPasswordDto);
  }


}
