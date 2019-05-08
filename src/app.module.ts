import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './tic-tac-toe/events/events.module';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';

@Module({
  imports: [TicTacToeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
