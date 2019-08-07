import { User } from '../user/user.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Session {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @Column()
  ip: string

  @ManyToOne(type => User, user => user.sessions)
  user: User
}
