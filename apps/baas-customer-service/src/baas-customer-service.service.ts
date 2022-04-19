import { Injectable } from '@nestjs/common';

@Injectable()
export class BaasCustomerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
