import { User } from '../user/user.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Session {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @Column()
  ip: string

  @OneToMany(type => User, user => user.sessions)
  @JoinColumn()
  user: User
}
