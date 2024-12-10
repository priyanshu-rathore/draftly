"use server";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const {
      email,
      providerId,
      uid: firebaseUID,
      displayName,
      photoURL,
      emailVerified,
    } = await req.json();
    console.log(firebaseUID, email, providerId);
    if (!firebaseUID || !email || !providerId) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 },
      );
    }

    const user = await User.findOneAndUpdate(
      { firebaseUID },
      {
        firebaseUID,
        email,
        displayName,
        photoURL,
        providerId,
        emailVerified,
        lastLoginAt: new Date(),
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
