import { GameState } from './game-state';
import { Injectable } from '@angular/core';
import { PlayerIndex } from '@angular/core/src/render3/interfaces/player';
import { GameStatus } from './game-status';

@Injectable({ providedIn: 'root' })
export class GameStateManager {
    private gameState: GameState

    public loadState(state: GameState) {
        this.gameState = state
    }

    public getTiles() {
        return this.gameState.board
    }

    public isPlayerOnTurn(player: string) {
        return this.gameState.currentPlayer === player
    }

    public isInProgress() {
        return this.gameState.status !== GameStatus.ENDED
    }
}