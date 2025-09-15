import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return ApiInfo', () => {
      expect(appController.getApiInfo()).toEqual({
        name: 'Item Comparison API',
        version: '1.0',
        description: 'RESTful API for product item comparison',
        endpoints: {
          documentation: '/api/docs',
          health: '/api/v1/health',
          items: '/api/v1/items',
        },
        features: [
          'Item management',
          'Pagination support'
        ]
      });
    });
  });
});
