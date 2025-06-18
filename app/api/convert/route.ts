import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, readFile } from "fs/promises";
import { join, resolve } from "path";
import { mkdir } from "fs/promises";
import { PDFDocument } from "pdf-lib";
import { prisma } from "@/prisma";
import { JobStatus } from "@/lib/generated/prisma";

interface ConversionMetadata {
  title: string;
  author: string;
  isbn?: string;
}

// Helper function to get PDF page count
async function getPdfPageCount(filePath: string): Promise<number> {
  try {
    const fullPath = resolve(process.cwd(), filePath);
    const pdfBytes = await readFile(fullPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error(`Error getting PDF page count: ${error}`);
    throw new Error("Failed to get PDF page count");
  }
}

// Helper function to save file
async function saveFile(file: File, directory: string, filename: string): Promise<string> {
  try {
    // Create directory if it doesn't exist
    const dirPath = join(process.cwd(), "uploads", directory);
    await mkdir(dirPath, { recursive: true });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file
    const filePath = join(dirPath, filename);
    await writeFile(filePath, buffer);

    // Return the public URL path
    return filePath;
  } catch (error) {
    console.error(`Error saving file: ${error}`);
    throw new Error("Failed to save file");
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const conversionType = formData.get("conversionType") as "epub" | "markdown";
    const metadataMode = formData.get("metadataMode") as "auto" | "manual";
    const metadata = formData.get("metadata") ? JSON.parse(formData.get("metadata") as string) as ConversionMetadata : null;
    const coverImage = formData.get("coverImage") as File | null;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    // Validate file type
    if (!file.type.includes("pdf")) {
      return new NextResponse("Invalid file type. Only PDF files are supported.", { status: 400 });
    }

    // Validate file size (500MB limit)
    const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      return new NextResponse("File size exceeds 500MB limit", { status: 400 });
    }

    // Validate metadata if in manual mode
    if (metadataMode === "manual" && metadata) {
      if (!metadata.title || !metadata.author) {
        return new NextResponse("Missing required metadata fields", { status: 400 });
      }
    }

    // Generate unique filenames
    const timestamp = Date.now();
    const pdfFilename = `upload_${timestamp}.pdf`;
    const coverFilename = coverImage ? `cover_${timestamp}.${coverImage.type.split('/')[1]}` : null;

    // Save files
    const pdfPath = await saveFile(file, "uploads", pdfFilename);
    let coverPath = null;

    if (coverImage) {
      coverPath = await saveFile(coverImage, "covers", coverFilename!);
    }

    // Get PDF page count
    const fullPdfPath = resolve(process.cwd(), pdfPath);
    const pageCount = await getPdfPageCount(fullPdfPath);

    // Calculate credit cost
    const metadataCost = conversionType === "epub" && metadataMode === "auto" ? 0.05 : 0;
    const roundUpToNearestQuarter = (num: number) => Math.ceil(num * 4) / 4;
    const tokenCount = roundUpToNearestQuarter(pageCount * 0.0015 + metadataCost);

    const databaseJob = await prisma.job.create({
      data: {
        input_file_path: fullPdfPath,
        status: JobStatus.PENDING
      }
    });

    console.log(databaseJob.id)

    // Create a job in the Rust server
    const rustServerUrl = process.env.RUST_SERVER_URL || 'http://localhost:8000';
    const jobResponse = await fetch(`${rustServerUrl}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: databaseJob.id,
        automatic_metadata: metadataMode === "auto",
        metadata
      }),
    });

    console.log(jobResponse);

    if (!jobResponse.ok) {
      throw new Error(`Failed to create conversion job: ${jobResponse.statusText}`);
    }

    const job = await jobResponse.json();

    // TODO: Check if user has enough credits
    // TODO: Implement actual file conversion logic here
    // This is where you would:
    // 1. Process the file (convert to EPUB/Markdown)
    // 2. Store the result
    // 3. Return the converted file URL or download link

    // For now, we'll return a mock response
    return NextResponse.json({
      success: true,
      ...job,
      pageCount,
      tokenCount
    });

  } catch (error) {
    console.error("[CONVERT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}