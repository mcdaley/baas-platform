import { Controller, Get } from '@nestjs/common';
import { BaasAccountServiceService } from './baas-account-service.service';

@Controller()
export class BaasAccountServiceController {
  constructor(private readonly baasAccountServiceService: BaasAccountServiceService) {}

  @Get()
  getHello(): string {
    return this.baasAccountServiceService.getHello();
  }
}
