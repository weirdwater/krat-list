import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql'
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Group {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field(type => Int)
  @Column()
  unitssPerCase: number

  @Field(type => Int)
  @Column()
  volumePerUnitMl: number

  @Field(type => Date)
  @CreateDateColumn()
  created: Date

  @Field(type => Date)
  @UpdateDateColumn()
  updated: Date

  @ManyToOne(type => User, user => user.ownedGroups)
  owner: User

  @ManyToMany(type => User, user => user.groups)
  @JoinTable()
  members: User[]
}
