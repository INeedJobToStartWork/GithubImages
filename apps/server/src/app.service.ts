import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(text?: { name?: string }): string {
    return `Hello ${text?.name ?? 'World'}!`;
  }
}
