import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: '*:*' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService: SocketService) {}
  @WebSocketServer() server;

  private readonly logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('hello')
  handleMessage(@MessageBody() body: any) {
    this.logger.log(body);
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);

    const user_id = socket.handshake.query.user_id as string;

    if (user_id) {
      this.socketService.addUserSocket(user_id, socket);
      this.logger.log(`Usuário ${user_id} conectado.`);

      this.socketService.notifyApprovedAdopter(user_id);
    }
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);

    const user_id = socket.handshake.query.user_id as string;

    if (user_id) {
      this.socketService.removeUserSocket(user_id);
    }
  }
}
