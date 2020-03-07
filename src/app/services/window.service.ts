import { Injectable } from "@angular/core";
import { LobbyService } from "./lobby.service";
import { GameService } from "./game.service";
import { BehaviorSubject } from "rxjs";
import { Window } from "../enums/window.enum";

@Injectable({
  providedIn: "root"
})
export class WindowService {
  private window = new BehaviorSubject<Window>(Window.LOGIN);
  public window$ = this.window.asObservable();
  constructor(
    private lobbyService: LobbyService,
    private gameService: GameService
  ) {
    this.lobbyService.playerIsInLobby$.subscribe((value: boolean) =>
      this.determineRoom(value, this.gameService.playerIsInGame.getValue())
    );
    this.gameService.playerIsInGame$.subscribe((value: boolean) =>
      this.determineRoom(this.lobbyService.playerIsInLobby.getValue(), value)
    );
  }

  private determineRoom(isInLobby: boolean, isInGame: boolean): void {
    console.log('window service:', isInLobby, isInGame)
    if (isInLobby && !isInGame) {
      this.window.next(Window.LOBBY);
    } else if (isInGame) {
      this.window.next(Window.GAME);
    } else {
      this.window.next(Window.LOGIN);
    }
  }
}
