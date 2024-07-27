// auth.service.ts
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDbService } from '../db/auth/auth-db.service';
import { AuthDto } from './dto/auth.dto';
import { hashPassword, comparePasswords, signToken } from './helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { ResponseUtil } from './helpers/response.util';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private authDbService: AuthDbService,
    private jwt: JwtService,
    private otpService: OtpService,
  ) { }

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const userExists = await this.authDbService.findUserByEmail(email);
    if (userExists) {
      throw new BadRequestException(ResponseUtil.error('Email already exists', 400));
    }

    const hashedPassword = await hashPassword(password);
    await this.authDbService.createUser(email, hashedPassword);

    return ResponseUtil.success(null, 'User created successfully');
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.authDbService.findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException(ResponseUtil.error('Wrong credentials', 400));
    }

    const compareSuccess = await comparePasswords({
      password,
      hash: foundUser.password,
    });
    if (!compareSuccess) {
      throw new BadRequestException(ResponseUtil.error('Wrong credentials', 400));
    }

    const token = await signToken(this.jwt, {
      userId: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException(ResponseUtil.error('Could not sign in', 403));
    }

    return ResponseUtil.success({ token }, 'Logged in successfully');
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    await this.otpService.sendOtp(forgotPasswordDto.email);
    return ResponseUtil.success(null, 'OTP sent successfully');
  }

}
