import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto'; // Import the DTO for password reset

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
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res: Response) {
    try {
      const { email, otp } = resetPasswordDto;
      await this.authService.resetPassword(email, otp, resetPasswordDto);
      return res.status(HttpStatus.OK).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

}
