import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
