"use client";
import { ArrowRight, BookOpen, CreditCard, FileText, Sparkles, Upload, Zap, Image as ImageIcon, User, Hash, Wand2, AlertTriangle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { toast } from "sonner";
import { z } from "zod";
import { conversionSchema, type ConversionFormData } from "@/schemas/conversion";

function ConversionBox(){
  const [conversionType, setConversionType] = useState<"epub" | "markdown">("epub");
  const [isDragging, setIsDragging] = useState(false);
  const [credits] = useState(50); // Example credit amount
  const [metadataMode, setMetadataMode] = useState<"auto" | "manual">("auto");
  const [metadata, setMetadata] = useState({
    title: "",
    author: "",
    isbn: "",
    coverImage: null as File | null
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [creditCost, setCreditCost] = useState<number>(0);
  const [conversionError, setConversionError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize PDF.js worker only on client side
    const initPdfJs = async () => {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs';
    };
    initPdfJs();
  }, []);

  // Recalculate credit cost whenever pageCount, metadataMode, or selectedFile changes
  useEffect(() => {
    if (!selectedFile) {
      setCreditCost(0);
      return;
    }

    if (pageCount) {
      const metadataCost = conversionType === "epub" && metadataMode === "auto" ? 0.05 : 0;
      const roundUpToNearestQuarter = (num: number) => Math.ceil(num * 4) / 4;
      const tokenCount = roundUpToNearestQuarter((pageCount ?? 0) * 0.0015 + metadataCost);
      setCreditCost(tokenCount);
    }
  }, [pageCount, metadataMode, selectedFile, conversionType]);

  const getPageCount = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjs = await import('pdfjs-dist');
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);
    } catch (error) {
      console.error("Error getting page count:", error);
      setPageCount(0);
    }
  };

  const validateFile = (file: File) => {
    try {
      conversionSchema.shape.file.parse(file);
      setFileError(null);
      getPageCount(file); // Get page count when file is validated
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFileError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleMetadataChange = (field: string, value: string | File) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error for this field
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = (): boolean => {
    try {
      const formData: ConversionFormData = {
        file: selectedFile!,
        conversionType,
        metadataMode,
        ...(metadataMode === "manual" && { metadata }),
      };

      conversionSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    if (!validateForm()) {
      toast.error("Validation failed", {
        description: "Please check the form for errors",
      });
      return;
    }

    setIsConverting(true);
    setConversionError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile!);
      formData.append("conversionType", conversionType);
      formData.append("metadataMode", metadataMode);

      if (metadataMode === "manual") {
        formData.append("metadata", JSON.stringify({
          title: metadata.title,
          author: metadata.author,
          isbn: metadata.isbn,
        }));
        if (metadata.coverImage) {
          formData.append("coverImage", metadata.coverImage);
        }
      }

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to start conversion");
      }

      const data = await response.json();
      const jobId = data.id;

      // Start polling for job status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`/api/convert/get-job-status/${jobId}`);
          if (!statusResponse.ok) {
            throw new Error("Failed to fetch job status");
          }

          const jobData = await statusResponse.json();

          if (jobData.status === "COMPLETED") {
            clearInterval(pollInterval);
            setIsConverting(false);
            toast.success("Conversion successful", {
              description: "Your file has been converted successfully",
            });
            // TODO: Handle the converted file download
          } else if (jobData.status === "FAILED") {
            clearInterval(pollInterval);
            setIsConverting(false);
            setConversionError(jobData.error_message || "Conversion failed");
            toast.error("Conversion failed", {
              description: jobData.error_message || "There was an error converting your file",
            });
          }
          // For PENDING and PROCESSING states, continue polling
        } catch (error) {
          clearInterval(pollInterval);
          setIsConverting(false);
          setConversionError("Failed to check conversion status");
          toast.error("Status check failed", {
            description: "Failed to check conversion status",
          });
        }
      }, 2000); // Poll every 2 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(pollInterval);
    } catch (error) {
      setIsConverting(false);
      setConversionError(error instanceof Error ? error.message : "An error occurred");
      toast.error("Conversion failed", {
        description: error instanceof Error ? error.message : "There was an error converting your file",
      });
    }
  };

  return (
    <div className="flex-1 w-full max-w-[800px]">
      <Card className="overflow-hidden border-orange-100 shadow-lg shadow-orange-100/50">
        {/* <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 px-6">
          <h2 className="text-white text-xl font-medium flex items-center">
            <Cpu className="mr-2 h-5 w-5" />
            Start Converting Now
          </h2>
        </div> */}

        <CardContent className="p-6 space-y-6">
          {/* Credits Section */}
          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Your Credits</span>
            </div>
            <span className="text-lg font-semibold text-orange-600">{credits}</span>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-gray-500 bg-gray-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf"
              onChange={handleFileSelect}
            />
            <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />

            <h3 className="text-lg font-medium text-gray-800 mb-1">
              Drag &amp; drop file or click to browse
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Support for PDF files (max 500MB)
            </p>

            {selectedFile && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</span>
                    {pageCount && (
                      <span className="text-xs text-gray-500">
                        {pageCount} {pageCount === 1 ? 'page' : 'pages'}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setFileError(null);
                        setPageCount(0);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs text-gray-500 border border-gray-200 mt-3">
              <Zap className="h-3 w-3 mr-1 text-orange-500" />
              This book will cost {creditCost} credits
            </div>
          </div>

          {fileError && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {fileError}
              </AlertDescription>
            </Alert>
          )}

          {/* Conversion Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              Output Document Format
            </label>
            <Select
              value={conversionType}
              onValueChange={(value: "epub" | "markdown") => setConversionType(value)}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-orange-500">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="epub">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-orange-500" />
                    <span>EPUB</span>
                    <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Recommended</span>
                  </div>
                </SelectItem>
                <SelectItem value="markdown">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Markdown</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* EPUB Metadata Fields */}
          {conversionType === "epub" && (
            <div className="space-y-4 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Book Metadata</h3>
                <Select
                  value={metadataMode}
                  onValueChange={(value: "auto" | "manual") => setMetadataMode(value)}
                >
                  <SelectTrigger className="w-[180px] border-gray-200 focus:ring-orange-500">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      <div className="flex items-center gap-2">
                        <Wand2 className="h-4 w-4 text-orange-500" />
                        <span>Auto-detect</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="manual">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-500" />
                        <span>Manual</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {metadataMode === "manual" && (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Label htmlFor="cover" className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4 text-orange-500" />
                      Cover Image
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg aspect-[2/3] w-[160px] cursor-pointer transition-colors overflow-hidden ${
                        isDragging
                          ? "border-gray-500 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                      onClick={() => document.getElementById("cover-upload")?.click()}
                    >
                      <input
                        type="file"
                        id="cover-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleMetadataChange("coverImage", file);
                        }}
                      />
                      {metadata.coverImage ? (
                        <div className="w-full h-full relative">
                          <img
                            src={URL.createObjectURL(metadata.coverImage)}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-2">
                          <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                          <div className="text-xs text-gray-600 text-center">
                            Upload cover
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-500" />
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter book title"
                        value={metadata.title}
                        onChange={(e) => handleMetadataChange("title", e.target.value)}
                        className={`border-gray-200 focus:ring-orange-500 ${
                          validationErrors['metadata.title'] ? 'border-red-300' : ''
                        }`}
                      />
                      {validationErrors['metadata.title'] && (
                        <p className="text-sm text-red-500">{validationErrors['metadata.title']}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-orange-500" />
                        Author
                      </Label>
                      <Input
                        id="author"
                        placeholder="Enter author name"
                        value={metadata.author}
                        onChange={(e) => handleMetadataChange("author", e.target.value)}
                        className={`border-gray-200 focus:ring-orange-500 ${
                          validationErrors['metadata.author'] ? 'border-red-300' : ''
                        }`}
                      />
                      {validationErrors['metadata.author'] && (
                        <p className="text-sm text-red-500">{validationErrors['metadata.author']}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="isbn" className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-orange-500" />
                        ISBN
                      </Label>
                      <Input
                        id="isbn"
                        placeholder="Enter ISBN number"
                        value={metadata.isbn}
                        onChange={(e) => handleMetadataChange("isbn", e.target.value)}
                        className="border-gray-200 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {metadataMode === "auto" && (
                <div className="text-sm text-gray-600 bg-white/50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Auto-detection enabled</span>
                  </div>
                  <p>Our AI will automatically extract metadata from your document, including title, author, and cover image when available.</p>
                </div>
              )}
            </div>
          )}

          {/* Convert Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-orange-300 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white py-6"
            onClick={handleSubmit}
            disabled={isConverting || !selectedFile}
          >
            {isConverting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                <span>Converting...</span>
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                <span>Convert to {conversionType.toUpperCase()}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export {ConversionBox}