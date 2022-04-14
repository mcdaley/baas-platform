import { Injectable } from '@nestjs/common';

@Injectable()
export class BaasAccountServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
