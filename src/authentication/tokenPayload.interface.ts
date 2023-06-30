import { ObjectId } from 'typeorm';

export interface TokenPayload {
  userId: ObjectId;
}
