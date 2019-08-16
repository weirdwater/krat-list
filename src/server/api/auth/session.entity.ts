import { User } from '../user/user.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Session {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => Date)
  @CreateDateColumn()
  created: Date

  @Field()
  @Column()
  ip: string

  @Field(type => User)
  @ManyToOne(type => User, user => user.sessions)
  user: User
}
