// lib/models/User.ts
import { Schema, Document, models, model } from 'mongoose';

// Subdocument Interface
export interface Message extends Document {
  _id: string;
  content: string;
  createdAt: Date;
}

// Message Schema
const MessageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  }
);

// User Document Interface
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// User Schema
const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
});

// Use existing model if already compiled (important for hot reload in Next.js)
const UserModel = models.User || model<User>('User', UserSchema);

export default UserModel;
