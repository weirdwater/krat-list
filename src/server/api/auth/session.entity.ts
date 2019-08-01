import { User } from '../user/user.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Session {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @Column()
  ip: string

  
  user: User
}
