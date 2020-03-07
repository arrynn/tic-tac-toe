import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LobbyService {
  private lobbySubject = new BehaviorSubject<string[]>([]);
  lobby$ = this.lobbySubject.asObservable();
  playerIsInLobby = new BehaviorSubject<boolean>(false);
  playerIsInLobby$ = this.playerIsInLobby.asObservable();

  constructor() {}

  enterLobby(lobby: string[]): void {
    this.lobbySubject.next(lobby);
    this.playerIsInLobby.next(true);
  }

  leaveLobby(): void {
    this.lobbySubject.next([]);
    this.playerIsInLobby.next(false);
  }
}
