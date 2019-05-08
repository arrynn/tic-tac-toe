import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID } from 'typeorm';
import { Board } from '../models/board.model';

@Entity()
export class Session {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  playerOne: string;

  @Column()
  playerTwo: string;

  @Column()
  board: Board;

}