import { Controller, Get } from '@nestjs/common';
import { BaasCustomerServiceService } from './baas-customer-service.service';

@Controller()
export class BaasCustomerServiceController {
  constructor(private readonly baasCustomerServiceService: BaasCustomerServiceService) {}

  @Get()
  getHello(): string {
    return this.baasCustomerServiceService.getHello();
  }
}
