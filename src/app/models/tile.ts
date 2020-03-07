import { TagContentType } from "@angular/compiler";
import { TileContent } from '../enums/tile-content.enum';

export class Tile {
  public constructor(private content: TileContent = TileContent.EMPTY) {}

  public isEmpty() {
    return this.content === TileContent.EMPTY;
  }
  public isCircle() {
    return this.content === TileContent.CIRCLE;
  }
  public isCross() {
    return this.content === TileContent.CROSS;
  }

  public setAsCircle() {
    this.content = TileContent.CIRCLE;
  }

  public setAsCross() {
    this.content = TileContent.CROSS;
  }

  public setAsEmpty() {
    this.content = TileContent.EMPTY;
  }

  public setContent(content: TileContent) {
    this.content = content;
  }
}
