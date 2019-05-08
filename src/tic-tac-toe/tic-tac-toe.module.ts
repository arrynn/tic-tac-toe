import { GameService } from "./services/game.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from "./entities/session.entity";
import { EventsGateway } from "./events/events.gateway";
import { LoggingInterceptor } from "./events/logging.interceptor";

@Module({
    imports: [
        
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            username: 'root',
            password: 'pass',
            database: 'app',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            useNewUrlParser: true
        }),
        TypeOrmModule.forFeature([Session]),
    ],
    controllers: [],
    providers: [GameService, EventsGateway, LoggingInterceptor],
    exports: [GameService],
})
export class TicTacToeModule { }