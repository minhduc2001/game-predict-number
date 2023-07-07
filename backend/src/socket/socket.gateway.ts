import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import {
  GAME_DURATION,
  PENDING_DURATION,
} from '@/shared/constants/socket.constant';
import { SessionService } from '@/session/session.service';
import { TransactionService } from '@/transaction/transaction.service';

@WebSocketGateway(3006, {
  cors: true,
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private userSession: Array<string> = [];

  constructor(
    private sessionService: SessionService,
    private transactionService: TransactionService,
  ) {}

  afterInit(server: any): any {}

  handleConnection(socket: Socket) {
    console.log('Client đã kết nối:', socket.id);
    this.userSession.push(socket.id);
    socket.on('click', () => {
      this.server.emit('reload');
    });

    socket.emit('countdown', this.countdown);

    if (!this.countdownInterval) {
      this.startCountdown();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('Client đã ngắt kết nối:', socket.id);
    this.userSession = this.userSession.filter((value) => value != socket.id);
  }

  @SubscribeMessage('disconnect')
  handleDisconnectEvent() {
    // Xử lý sự kiện disconnect từ client
  }

  private countdownInterval: NodeJS.Timeout;
  private pendingTimeout: NodeJS.Timeout;
  private countdown = GAME_DURATION;

  private async startCountdown() {
    if (this.userSession.length > 0) {
      let phien = (await this.sessionService.createSession()) || {
        coinRandom: 0,
      };

      this.countdownInterval = setInterval(() => {
        this.countdown--;

        if (this.countdown >= 0) {
          this.server.emit('countdown', this.countdown);
          this.server.emit('session', phien);
          if (this.countdown == 15) {
            this.sessionService
              .randomCoin()
              .then((res) => (phien.coinRandom = res));
          }
        } else {
          clearInterval(this.countdownInterval);
          this.startPendingPhase(phien);
        }
      }, 1000);
    } else {
      clearInterval(this.countdownInterval);
      clearTimeout(this.pendingTimeout);
    }
  }

  private async startPendingPhase(phien: any) {
    this.sessionService
      .totalCoin()
      .then((data) => {
        this.sessionService.setRes();
      })
      .then(() => {
        return this.transactionService.setRes();
        // this.server.emit('session', data);
      })
      .then(() => this.server.emit('pending'));

    this.pendingTimeout = setTimeout(() => {
      this.countdown = GAME_DURATION;
      // this.server.emit('countdown', this.countdown);
      // this.server.emit('session', phien);
      this.startCountdown();
    }, PENDING_DURATION * 1000);
  }
}
