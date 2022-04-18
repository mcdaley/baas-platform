import { Controller, Get } from '@nestjs/common';
import { BaasDebitCardServiceService } from './baas-debit-card-service.service';

@Controller()
export class BaasDebitCardServiceController {
  constructor(private readonly baasDebitCardServiceService: BaasDebitCardServiceService) {}

  @Get()
  getHello(): string {
    return this.baasDebitCardServiceService.getHello();
  }
}
