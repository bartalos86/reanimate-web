import { auth } from "@/auth";
import { getAllJobsForUser } from "@/data/job";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return await getAllJobsForUser(session.user.id);
}
