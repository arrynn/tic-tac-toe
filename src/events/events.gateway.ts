import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets'
import { from, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'

class Game{

  private playerOne: string
  private playerTwo: string
  private playerOnMove: string
  private grid: any[]
  private isGameFinished: boolean
  private winner: string

  constructor(players: string[]) {
    this.playerOne = players.pop()
    this.playerTwo = players.pop()
    this.playerOnMove = this.playerOne

    this.grid = []
    for (let i = 0; i<9; i++){
      this.grid.push({
        index: i,
        icon: 'none'
      })
    }
    this.isGameFinished = false
    this.winner = 'N/A'
  }

  toJson(): any{
    return {
      players: [
        {
          name: this.playerOne,
          icon: 'circle',
        },
        {
          name: this.playerTwo,
          icon: 'cross'
        }
      ],
      onMove: this.playerOnMove,
      grid: this.grid,
      isGameFinished: this.isGameFinished,
      winner: this.winner
    }
  }

  getPlayerIcon(player: string): string{
    return (player === this.playerOne) ? 'circle': 'cross'
  }

  move(player: string, index: number): boolean{
    if(player === this.playerOnMove){
      const field = this.grid[index]
      if(field.icon === 'none'){
        this.grid[index].icon = this.getPlayerIcon(player)
        this.playerOnMove = this.playerOnMove === this.playerOne ? this.playerTwo:this.playerOne
        this.checkWinCondition(player)
        return true
      }
    }
    return false
  }

  checkWinCondition(player:string){
    const icon = this.getPlayerIcon(player)
    const playerFields = this.grid.filter(i => i.icon === icon)
    if(playerFields.length < 3) {return}
    const indexes = playerFields.map(i => i.index)
    const combos: string[] = []
    for(let i of indexes){
      const l2 = indexes.filter(a => a !== i)
      for(let j of l2){
        const l3 = l2.filter(a => a !== j)
        for(let k of l3){
          combos.push(`${i}${j}${k}`)
        }
      }
    }

    const wins = [
      '012','345','678','036','147','258','246','048'
    ];

    for (let combo of combos){
      for(let win of wins){
        if(combo == win){
          this.winner = player
          this.isGameFinished = true
        }
      }
    }

  }
}

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
  private server: Server

  private lobby: string[] = []
  private game: Game

  afterInit(server: Server) {
    this.server = server
  }

  @SubscribeMessage('enterLobby')
  findAll(@MessageBody() nickname: string): Observable<WsResponse<string[]>> | void {
    console.log('Entering lobby: ' + nickname)

    if(!this.lobby.includes(nickname)){
      this.lobby.push(nickname)
    }

    if(this.lobby.length === 2){
      this.startGame()
      return
    }

    const response: WsResponse<string[]> = {
      event: 'lobbyEntered',
      data: this.lobby
    }

    return of(response)
  }

  startGame(): void{
    this.game = new Game(this.lobby)
    this.server.emit('gameStarted', this.game.toJson())
  }

  @SubscribeMessage('makeMove')
  move(@MessageBody() data: any): void {
    this.game.move(data.player, data.index)
    this.server.emit('gameProceeded', this.game.toJson())
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log('event there')
    return data
  }
}
