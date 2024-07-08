import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  healthCheck() {
    return {
      code: 200,
      data: {
        status: 'UP',
        current_time: new Date().toISOString(),
      },
      message: 'API is healthy',
    };
  }
}
