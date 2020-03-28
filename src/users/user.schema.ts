import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  hash: String,
  username: String,
});
