import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Session } from "../auth/session.entity";
import { Exclude } from 'class-transformer'
import { ObjectType, Field } from 'type-graphql'
import { Group } from "../group/group.entity";

@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string

  @Field(type => Date)
  @CreateDateColumn()
  created: Date

  @Field(type => Date)
  @UpdateDateColumn()
  updated: Date

  @Exclude()
  @Column()
  encryptedPassword: string

  @Field(type => Boolean)
  @Exclude()
  @Column({ default: false })
  emailConfirmed: boolean

  @Field(type => Boolean)
  @Exclude()
  @Column({ default: true })
  active: boolean

  // @Field(type => [Session])
  @Exclude()
  @OneToMany(type => Session, session => session.user)
  sessions: Session[]

  @OneToMany(type => Group, group => group.owner)
  ownedGroups: Group[]

  @ManyToMany(type => Group, group => group.members)
  groups: Group[]

}
