import { Component } from "@angular/core";
import io from "socket.io-client";
import { ApiService } from "./services/api.service";
import { WindowService } from "./services/window.service";
import { switchMap } from "rxjs/operators";
import { Window } from "./enums/window.enum";
import { of, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "tic-tac-lobby";
  client: SocketIOClient.Socket;
  isInGame$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    public windowService: WindowService
  ) {
    this.isInGame$ = this.windowService.window$.pipe(
      switchMap(i => of(i === Window.GAME))
    );
  }

  clicked() {
    const client = io("localhost:8080");
    client.on("lobbyRegistered", data => console.log(data));
    client.on("connect", () => this.test(client));
  }

  test(client: SocketIOClient.Socket) {
    console.log(client);
    this.client = client;
    this.client.emit("lobbyEnter", { msg: "Hello!" }, res => console.log(res));
  }
}
