import { JobStatus } from "@/lib/generated/prisma";
import { prisma } from "@/prisma";

export async function getPendingJobsForUser(userId: string){
  try {
    const pendingJobs = await prisma.job.findMany({where: {
      userId: userId,
      status: JobStatus.PROCESSING
    }});

    return pendingJobs;
  } catch {
    return null;
  }
}

export async function getAllJobsForUser(userId: string){
  try {
    const jobs = await prisma.job.findMany({where: {
      userId: userId,
    }});

    return jobs;
  } catch {
    return null;
  }
}