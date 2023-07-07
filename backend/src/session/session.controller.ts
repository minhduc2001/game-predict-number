import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private service: SessionService) {}

  @Get('get-turn')
  getTurn() {
    return this.service.getTurn();
  }

  @Get('cltx')
  getCltx() {
    return this.service.getCltx();
  }
}
