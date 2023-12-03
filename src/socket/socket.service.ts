import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly userSockets = new Map<string, Socket>();

  addUserSocket(user_id: string, socket: Socket) {
    this.userSockets.set(user_id, socket);
  }

  removeUserSocket(user_id: string) {
    this.userSockets.delete(user_id);
  }

  getUserSocket(user_id: string): Socket | undefined {
    return this.userSockets.get(user_id);
  }

  notifyApprovedAdopter(user_id: string) {
    const userSocket = this.getUserSocket(user_id);
    if (userSocket) {
      userSocket.emit('approvedAdopter', { user_id, message: 'Você foi aprovado como adotante!' });
    }
  }
}
