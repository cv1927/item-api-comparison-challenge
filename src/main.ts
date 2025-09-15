import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api')

  // Security
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.use(helmet())


  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Item Comparison API')
    .setDescription('API for comparing items')
    .setVersion('1.0')
    .addTag('items', 'Item management')
    .addTag('health', 'Health check endpoints')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  // Redirect root to Swagger docs
  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/api/docs');
  });

  const port = configService.get('PORT', 3000);
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Swagger documentation: ${await app.getUrl()}/api/docs`);
}
bootstrap();
