import { Injectable } from "@nestjs/common";
import { Action } from "../models/action.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "../entities/session.entity";
import { Repository } from "typeorm";
import { Board } from "../models/board.model";
import { TileContent } from "../models/tile-content.enum";
import { of } from "rxjs";

@Injectable()
export class GameService {

    public constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>
    ) { }

    public async persistAction(action: Action): Promise<any> {
        console.log('inside persistaction')
        
        const session: Session = await this.sessionRepository.findOne(action.sessionId)
        const targetTileType = action.playerName === session.playerOne ? TileContent.CIRCLE : TileContent.CROSS
        if (action.playerName !== session.playerOne){
            session.playerTwo = action.playerName
        }
        console.log('action: '+action.playerName+' sessioin:' + session.playerOne)
        session.board.tiles[action.tileIdx].content = targetTileType
        this.sessionRepository.save(session)
        console.log(session)
        return session
        // console.log(action)
    }

    public async init(data: any): Promise<any>{
        console.log(data)
        const session = new Session()
        session.playerOne = data.playerName
        session.board = new Board()
        return await this.sessionRepository.save(session)
    }

    public async renew(data: any): Promise<any>{
        console.log(data)
        return await this.sessionRepository.findOne(data.sessionId)
    }
}