import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, LoggerService } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Socket } from "socket.io";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private logger: Logger

    constructor() {
        this.logger = new Logger()
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handlerSignature = context.getClass().name + '::' + context.getHandler().name
        this.logger.debug(`Intercepting websocket call directed into '${handlerSignature}'`)
        const now = Date.now()
        return next
            .handle()
            .pipe(
                tap(() => this.logger.debug(`execution time: ${Date.now() - now}ms`)),
            );
    }
}