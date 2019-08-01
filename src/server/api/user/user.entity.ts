import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { Session } from "../auth/session.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column()
  encryptedPassword: string

  @Column()
  emailConfirmed: boolean

  @Column()
  active: boolean

  @ManyToOne(type => Session, session => session.user)
  sessions: Session[]

}
