import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { LoggingInterceptor } from './logging.interceptor';
import { GameService } from '../services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [EventsGateway, LoggingInterceptor],
  imports: [GameService, TypeOrmModule]
})
export class EventsModule {}