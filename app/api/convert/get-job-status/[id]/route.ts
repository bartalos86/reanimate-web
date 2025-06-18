import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(
    request: Request,
    { params }: RouteParams
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;

        const job = await prisma.job.findUnique({
            where: {
                id: id,
            },
        });

        if (!job) {
            return new NextResponse("Job not found", { status: 404 });
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("Error fetching job status:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}