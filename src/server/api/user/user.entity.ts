import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

}
