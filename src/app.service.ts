import { Injectable, Logger } from '@nestjs/common';

export type ApiInfo = {
  name: string;
  version: string;
  description: string;
  endpoints: {
    documentation: string;
    health: string;
    items: string;
  };
  features: string[];
}

/**
 * Service providing API information.
 * Contains methods to retrieve basic information about the API.
 * Includes details such as name, version, description, endpoints, and features.
 */
@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  getApiInfo(): ApiInfo {
    this.logger.log('Fetching API information');
    return {
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
    };
  }

}
