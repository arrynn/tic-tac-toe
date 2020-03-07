import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  playerIsInGame = new BehaviorSubject<boolean>(false);
  playerIsInGame$ = this.playerIsInGame.asObservable();
  gameProceeded = new Subject<any>();
  gameProceeded$ = this.gameProceeded.asObservable();
  nickname: string;
  game: any;
  constructor() {}

  enterGame(game: any, nickname: string): void {
    console.log(game)
    this.playerIsInGame.next(true);
    this.game = game;
    this.nickname = nickname;
  }

  refreshBoard(game: any): void{
    console.log(game)
    console.log('refreshing')
    this.game = game
    this.gameProceeded.next(game)
  }
}
