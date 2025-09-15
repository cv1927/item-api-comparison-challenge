import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


import type { ApiInfo } from './app.service';
import { AppService } from './app.service';

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
