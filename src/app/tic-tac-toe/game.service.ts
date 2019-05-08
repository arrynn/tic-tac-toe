import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ActionType } from './game-action';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {

    private inboundSubj: Subject<any> = new Subject
    public inbound$: Observable<any>
    private initSubj: Subject<any> = new Subject
    public init$: Observable<any>
    private renewSubj: Subject<any> = new Subject
    public renew$: Observable<any>

    constructor(private socket: Socket) {
        socket.on('push', (data) => this.inboundSubj.next(data))
        this.inbound$ = this.inboundSubj.asObservable();
        socket.on('init', (data) => this.initSubj.next(data))
        this.init$ = this.initSubj.asObservable();
        socket.on('renew', (data) => this.renewSubj.next(data))
        this.renew$ = this.renewSubj.asObservable();
    }

    public emitAction(action: ActionType, data: any) {
        this.socket.emit(action, data);
    }
}
