import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDbService } from '../db/auth/auth-db.service';
import { AuthDto } from './dto/auth.dto';
import { hashPassword, comparePasswords, signToken } from './helpers/auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { ResponseUtil } from './helpers/response.util';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { randomInt } from 'crypto';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private authDbService: AuthDbService,
    private jwt: JwtService,
    private prisma: PrismaService,

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate 6-digit OTP
    const otp = randomInt(100000, 999999).toString();

    // Store OTP in the database
    await this.prisma.user.update({
      where: { email },
      data: { otp },
    });

    // Send OTP to user's email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"YourAppName" ${process.env.EMAIL_USER}`, // sender address
      to: email, // list of receivers
      subject: 'Your OTP for Password Reset', // Subject line
      text: `Your OTP is ${otp}`, // plain text body
      html: `<strong>Your OTP is ${otp}</strong>`, // html body
    };

    await transporter.sendMail(mailOptions);
  }


}
