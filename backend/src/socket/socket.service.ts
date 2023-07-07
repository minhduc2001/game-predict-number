import {
  GAME_DURATION,
  PENDING_DURATION,
} from '@/shared/constants/socket.constant';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  private countdownInterval: NodeJS.Timeout;
  private pendingTimeout: NodeJS.Timeout;
  private countdown: number = GAME_DURATION;

  constructor(private readonly socketGateway: SocketGateway) {}

  getCountdown(): number {
    return this.countdown;
  }

  isCountdownRunning(): boolean {
    return !!this.countdownInterval;
  }

  handleConnection(socket: Socket) {
    console.log('Client đã kết nối:', socket.id);

    socket.emit('countdown', this.countdown);

    if (!this.countdownInterval) {
      this.startCountdown();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log('Client đã ngắt kết nối:', socket.id);

    // if (Object.keys(this.server.sockets.connected).length === 0) {
    //   this.stopCountdown();
    // }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown >= 0) {
        this.socketGateway.server.emit('countdown', this.countdown); // Sử dụng socketGateway để truy cập server và gửi dữ liệu tới client
      } else {
        clearInterval(this.countdownInterval);
        this.startPendingPhase();
      }
    }, 1000);
  }

  private stopCountdown() {
    clearInterval(this.countdownInterval);
    this.countdownInterval = null;
  }

  private startPendingPhase() {
    this.socketGateway.server.emit('pending');

    this.pendingTimeout = setTimeout(() => {
      this.countdown = GAME_DURATION;
      this.socketGateway.server.emit('countdown', this.countdown);
      this.startCountdown();
    }, PENDING_DURATION * 1000);
  }
}
