import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () =>
          ({
            DATABASE_URL: process.env.DATABASE_URL,
            JWT_SECRET: process.env.JWT_SECRET,
            PORT: parseInt(process.env.PORT, 10),
            NODE_ENV: process.env.NODE_ENV,
          }) as EnvConfig,
      ],
      validate: (config: EnvConfig) => {
        const errorMessages = [];

        // Validate DATABASE_URL
        if (!config.DATABASE_URL) {
          errorMessages.push('DATABASE_URL should not be empty');
        }

        // Validate JWT_SECRET
        if (!config.JWT_SECRET) {
          errorMessages.push('JWT_SECRET should not be empty');
        }

        // Validate PORT
        if (isNaN(config.PORT)) {
          errorMessages.push('PORT should be a valid number');
        }
        if (config.PORT === undefined || config.PORT < 0 || config.PORT > 65535) {
          errorMessages.push('PORT should be between 0 and 65535');
        }

        // Common validation
        if (errorMessages.length > 0) {
          throw new Error(`Environment validation failed:\n${errorMessages.join('\n')}`);
        }

        return config;
      },
    }),
  ],
  exports: [ConfigModule],
})
export class EnvConfigModule {}
