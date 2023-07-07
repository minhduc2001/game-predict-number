import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SessionModule } from '@/session/session.module';
import { TransactionModule } from '@/transaction/transaction.module';

@Module({
  imports: [SessionModule, TransactionModule],
  providers: [SocketGateway],
})
export class SocketModule {}
