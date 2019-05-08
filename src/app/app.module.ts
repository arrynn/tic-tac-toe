import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const socketIoConfig: SocketIoConfig = { url: 'http://localhost:8901', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
