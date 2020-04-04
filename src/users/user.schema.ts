import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    required: true,
    set: (v: string): string => v.toLowerCase(),
    type: String,
    unique: true,
  },
  hash: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    set: (v: string): string => v.toLowerCase(),
    type: String,
    unique: true,
  },
});
