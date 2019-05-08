import { Tile } from './tile';
import { GameStatus } from './game-status';

export interface GameState{
    status: GameStatus
    winner?: string
    currentPlayer?: string
    board: Tile[]
}