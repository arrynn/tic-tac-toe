import { Component, OnInit } from '@angular/core';
import { Tile } from './tile';
import { GameStateManager } from './game-state.manager';
import { GameState } from './game-state';
import { GameStatus } from './game-status';
import { GameService } from './game.service';
import { ActionType } from './game-action';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  tiles: Tile[]
  playerName: string;

  constructor(private route: ActivatedRoute, private gameStateManager: GameStateManager, private gameService: GameService) { }

  ngOnInit() {
    this.playerName = 'Unknown'
    if(localStorage.getItem('PLAYER_NAME') != null){
      this.playerName = localStorage.getItem('PLAYER_NAME')
    }
    if (this.route.snapshot.params.sessionId) {
      localStorage.setItem('SESSION_ID', this.route.snapshot.params.sessionId)
      this.playerName = this.route.snapshot.params.playerId
    }

    this.tiles = []

    for (let i = 1; i <= 9; i++) {
      const tile = new Tile()
      this.tiles.push(tile)
    }
    // this.tiles[2].setAsCircle();
    // this.tiles[5].setAsCross();

    this.gameStateManager.loadState({
      currentPlayer: this.playerName,
      status: GameStatus.RUNNING,
      board: this.tiles
    })

    if (localStorage.getItem('SESSION_ID') == null) {
      const pn = 'P1';
      localStorage.setItem('PLAYER_NAME', pn)
      this.gameService.emitAction(ActionType.INIT, { playerName: pn })
      this.gameService.init$.subscribe((data) => {
        console.log(data)
        localStorage.setItem('SESSION_ID', data.id)
        for (let tile in data.board.tiles) {
          this.tiles[tile].setContent(data.board.tiles[tile].content)
        }
      })
    } else {
      this.gameService.emitAction(ActionType.RENEW, { sessionId: localStorage.getItem('SESSION_ID') })
      this.gameService.renew$.subscribe((data) => {
        console.log('RENEW', data)
        for (let tile in data.board.tiles) {
          this.tiles[tile].setContent(data.board.tiles[tile].content)
        }
      })
    }

    this.gameService.inbound$.subscribe((data) => console.log(data))
  }

  onGameProgress(state: GameState) {
    this.gameStateManager.loadState(state);
    this.tiles = this.gameStateManager.getTiles()
  }

  canPerformAction() {
    return this.gameStateManager.isPlayerOnTurn(this.playerName)
  }

  selectTile(index: number) {
    console.log(index)
    const sessId = localStorage.getItem('SESSION_ID')
    this.gameService.emitAction(ActionType.MOVE, { sessionId: sessId, playerName: this.playerName, tileIdx: index });
  }
}
