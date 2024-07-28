import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto'; // Import the DTO for password reset
import { MESSAGES } from 'src/common/response/response-messages';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @Post('signup')
  // async signup(@Body() dto: AuthDto, @Res() res: Response) {
  //   const result = await this.authService.signup(dto);
  //   return res.status(HttpStatus.CREATED).json(result);
  // }

  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const result = await this.authService.signin(dto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('verify-otp')
  async verifyOTP(@Body() body: { email: string; otp: string }) {
    return await this.authService.verifyOTP(body.email, body.otp);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, otp } = resetPasswordDto;
    return await this.authService.resetPassword(email, otp, resetPasswordDto);
  }

}
