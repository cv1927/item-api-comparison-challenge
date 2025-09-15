import { Controller, Get, Logger } from "@nestjs/common";
import {
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    DiskHealthIndicator
} from "@nestjs/terminus";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('health')
@Controller('health')
export class HealthController {

    private readonly logger = new Logger(HealthController.name);

    constructor(
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Health Check',
        description: 'Checks the health of the application'
    })
    @ApiResponse({
        status: 200,
        description: 'Application is healthy'
    })
    @HealthCheck()
    check() {
        this.logger.log('Performing health check');

        return this.health.check([
            async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
            async () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024), // 300MB
            async () => this.disk.checkStorage('disk', { thresholdPercent: 0.7, path: '/' }) // 70% usage
        ]);
    }
}