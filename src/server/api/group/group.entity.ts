import { Field, Int, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupMember } from "./groupMember.entity";

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

  @Field(type => [GroupMember])
  @OneToMany(type => GroupMember, gm => gm.group)
  members: GroupMember[]

}
