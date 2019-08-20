import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Group {

  @PrimaryGeneratedColumn({ type: 'uuid'})
  id: string

  @Column()
  name: string

  @Column()
  unitssPerCase: number

  @Column()
  volumePerUnitMl: number

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @ManyToOne(type => User, user => user.ownedGroups)
  owner: User

  @ManyToMany(type => User, user => user.groups)
  @JoinTable()
  members: User[]
}
