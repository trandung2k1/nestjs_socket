/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit,  OnGatewayConnection, OnGatewayDisconnect{
  // @WebSocketServer()
  // server: Server;

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
    
  }
  @SubscribeMessage('login')
  login(@MessageBody() data: {name: string, email: string}) {
    // console.log(data.name, data.email);
    this.server.emit('login-success', data)
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${(client.id)}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
