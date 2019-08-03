import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from "typeorm";
import { Session } from "../auth/session.entity";
import { Exclude } from 'class-transformer'

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  avatar: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Exclude()
  @Column()
  encryptedPassword: string

  @Exclude()
  @Column({ default: false })
  emailConfirmed: boolean

  @Exclude()
  @Column({ default: false })
  active: boolean

  @Exclude()
  @ManyToOne(type => Session, session => session.user)
  sessions: Session[]

}
