import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


import type { ApiInfo } from './app.service';
import { AppService } from './app.service';

/**
 * Controller for application-level endpoints.
 * Provides an endpoint to retrieve basic information about the API.
 * Returns API information including name, version, description, endpoints, and features.
 */
@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get API information',
    description: 'Returns basic information about the API',
  })
  @ApiResponse({
    status: 200,
    description: 'API information retrieved successfully'
  })
  getApiInfo(): ApiInfo {
    return this.appService.getApiInfo();
  }
}
