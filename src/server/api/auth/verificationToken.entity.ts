import { User } from "../user/user.entity";
import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

export const verificationTokenTypes = ['password', 'email'] as const
export type VerificationTokenType = typeof verificationTokenTypes[number]

@Entity()
export class VerificationToken {

  @Column({
    primary: true,
    type: 'enum',
    enum: verificationTokenTypes
  })
  type: VerificationTokenType

  @ManyToOne(type => User, { primary: true })
  user: User

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column({ unique: true, generated: 'uuid' })
  token: string

}

