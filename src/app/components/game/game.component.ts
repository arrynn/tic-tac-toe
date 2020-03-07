import { Component, OnInit } from "@angular/core";
import { Tile } from "src/app/models/tile";
import { GameService } from 'src/app/services/game.service';
import { ApiService } from 'src/app/services/api.service';
import { tap } from 'rxjs/operators';
import { TileContent } from 'src/app/enums/tile-content.enum';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  tiles: Tile[];
  onMove: string;
  constructor(public gameService: GameService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.tiles = [];
    this.onMove = this.gameService.game.onMove;
    for (let i = 1; i <= 9; i++) {
      const tile = new Tile();
      this.tiles.push(tile);
    }
    this.gameService.gameProceeded$.pipe(tap(d => this.onMove = d.onMove)).subscribe(data => this.updateTiles(data))
  }

  updateTiles(data){
    console.log('refreshing tiles')
    const tiles = [];
    for(let tile of data.grid){
     if (tile.icon === 'none'){
       tiles.push(new Tile());
     } else {
       const type = tile.icon === 'circle' ? TileContent.CIRCLE : TileContent.CROSS;
       tiles.push(new Tile(type));
     }
    }
    this.tiles = tiles;

    if(data.isGameFinished == true){
      alert(data.winner + ' wins!')
    }
  }

  selectTile(index: number) {
    console.log(index);
    this.apiService.move(this.gameService.nickname, index)
  }

  canPerformAction(): boolean{
    return true;
  }
}
