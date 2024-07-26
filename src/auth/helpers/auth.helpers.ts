// src/auth/helpers/auth.helpers.ts

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../../utils/constants';

// Hashing password
export async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}

// Comparing passwords
export async function comparePasswords(args: { hash: string; password: string }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
}

// Signing token
export async function signToken(jwt: JwtService, args: { userId: string; email: string }): Promise<string> {
    const payload = {
        id: args.userId,
        email: args.email,
    };

    return await jwt.signAsync(payload, {
        secret: jwtSecret,
    });
}
