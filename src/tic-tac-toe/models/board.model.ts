import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID } from 'typeorm';
import { BroadcasterResult } from 'typeorm/subscriber/BroadcasterResult';
import { Tile } from './tile.model';
import { TileContent } from './tile-content.enum';

export class Board {
    tiles: Tile[]

    public constructor() {
        this.tiles = [];
        for (let i = 1; i <= 9; i++) {
            const tile = new Tile()
            // tile.content = TileContent.EMPTY
            this.tiles.push(tile)
        }
    }
}