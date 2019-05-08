import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';
import { ActionType } from '../actions/game-action';
import { UseInterceptors, LoggerService } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { GameService } from '../services/game.service';
import { Action } from '../models/action.model';

@WebSocketGateway(8901)
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    constructor(private gameService: GameService){}

    @SubscribeMessage('events')
    findAll(client: Client, data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('identity')
    async identity(client: Client, data: number): Promise<number> {
        return data;
    }

    @UseInterceptors(LoggingInterceptor)
    @SubscribeMessage(ActionType.MOVE)
    async move(client: Client, data: Action): Promise<any> {
        const session = await this.gameService.persistAction(data)
        this.server.emit('renew', session)
        // return of({ event: 'push', data: { acknowledged: data } })
    }

    @UseInterceptors(LoggingInterceptor)
    @SubscribeMessage(ActionType.INIT)
    init(client: Client, data: any): Observable<WsResponse<any>> {
        return from(this.gameService.init(data)).pipe(map(i => { return {event:'init', data: i}}))
        // return of({ event: 'push', data: { acknowledged: data } })
    }

    @UseInterceptors(LoggingInterceptor)
    @SubscribeMessage(ActionType.RENEW)
    renew(client: Client, data: any): Observable<WsResponse<any>> {
        return from(this.gameService.renew(data)).pipe(map(i => { return {event:'renew', data: i}}))
        // return of({ event: 'push', data: { acknowledged: data } })
    }
}