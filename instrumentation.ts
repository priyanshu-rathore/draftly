import connectToDatabase from "@/lib/db";

export async function register() {
  await connectToDatabase();
}
