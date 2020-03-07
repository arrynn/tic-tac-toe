import { Injectable } from "@angular/core";
import io from "socket.io-client";
import { LobbyService } from "./lobby.service";
import { GameService } from "./game.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  client: SocketIOClient.Socket;
  nickname: string;

  constructor(
    public lobbyService: LobbyService,
    public gameServide: GameService
  ) {
    this.client = io("192.168.0.143:8080");
    this.registerSocketEvents();
  }

  joinLobby(nickname: string): void {
    console.log('emitting');
    this.client.emit("enterLobby", nickname);
    this.nickname = nickname;
  }

  move(nickname: string, index: number): void{
    console.log('moving');
    this.client.emit('makeMove', {player: nickname, index: index});
  }

  private registerSocketEvents(): void {
    this.client.on("lobbyEntered", (lobby: string[]) =>
      this.lobbyService.enterLobby(lobby)
    );
    this.client.on("gameStarted", (game: any) =>
      this.gameServide.enterGame(game, this.nickname)
    );
    this.client.on("gameProceeded", (game: any) =>
      this.gameServide.refreshBoard(game)
    );
  }
}
