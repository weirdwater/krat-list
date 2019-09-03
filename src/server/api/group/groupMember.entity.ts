import { Field, ObjectType, registerEnumType, createUnionType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Group } from "./group.entity";

export const membershipRoles = ['member', 'owner'] as const
export type MembershipRole = typeof membershipRoles[number]

@ObjectType()
@Entity()
export class GroupMember {

  @Field(type => Group)
  @ManyToOne(type => Group, group => group.members, { primary: true })
  group: Group

  @Field(type => User)
  @ManyToOne(type => User, user => user.groups, { primary: true })
  member: User

  @Field()
  @Column({
    type: 'enum',
    enum: membershipRoles,
    default: 'member',
  })
  role: MembershipRole

  @Field(type => Date)
  @CreateDateColumn()
  created: Date

  @Field(type => Date)
  @UpdateDateColumn()
  updated: Date

}