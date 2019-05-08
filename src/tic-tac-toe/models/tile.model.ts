import { TileContent } from "./tile-content.enum";

export class Tile {

    public constructor(public content: TileContent = TileContent.EMPTY) { }
}