import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './config/configuration';

// Modules
import { HealthModule } from './health/health.module';
import { ItemModule } from './items/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.local'],
      isGlobal: true,
      load: [configuration]
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'RateLimiter',
          ttl: 60000,
          limit: 100,
        }
      ]
    }),
    HealthModule,
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
