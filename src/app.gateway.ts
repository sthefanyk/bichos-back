import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer() server;

  handleConnection(socket: Socket) {
    const user_id = socket.handshake.query.user_id as string;

    if (user_id) {
      this.socketService.addUserSocket(user_id, socket);
      console.log(`Usuário ${user_id} conectado.`);
    }
  }

  handleDisconnect(socket: Socket) {
    const user_id = socket.handshake.query.user_id as string;
    if (user_id) {
      this.socketService.removeUserSocket(user_id);
    }
  }
}

