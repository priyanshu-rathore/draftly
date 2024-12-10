"use server";
import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  firebaseUID: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  providerId: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: false,
    },
    photoURL: {
      type: String,
      required: false,
    },
    providerId: {
      type: String,
      required: true,
      enum: ["password", "google.com"],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Create indexes for firebaseUID and email
UserSchema.index({ firebaseUID: 1 });
UserSchema.index({ email: 1 });

// Avoid model overwrite during development (if model already exists in mongoose.models)
if (mongoose.models.User) {
  delete mongoose.models.User;
}

// Define the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
