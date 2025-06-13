import { ArrowRight, BookOpen, CreditCard, FileText, Sparkles, Upload, Zap, GraduationCap, Brain, BookMarked } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function StudyConvertBox(){
  const [isDragging, setIsDragging] = useState(false);
  const [credits] = useState(50); // Example credit amount
  const [studyType, setStudyType] = useState("notes");
  const [metadata, setMetadata] = useState({
    title: "",
    subject: "",
    topic: "",
    keywords: ""
  });

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
    // Handle the dropped file(s)
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
    // Process files...
  };

  const handleMetadataChange = (field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex-1 w-full max-w-[800px]">
      <Card className="overflow-hidden border-orange-100 shadow-lg shadow-orange-100/50">
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
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => console.log("Selected files:", e.target.files)}
            />
            <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />

            <h3 className="text-base font-medium text-gray-800 mb-1">
              Drag &amp; drop study material or click to browse
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Support for PDF, DOC, DOCX, and TXT files
            </p>

            <div className="inline-flex items-center px-2.5 py-0.5 bg-white rounded-full text-xs text-gray-500 border border-gray-200 mt-2">
              <Zap className="h-3 w-3 mr-1 text-orange-500" />
              One document uses ~3 credits
            </div>
          </div>

          {/* Study Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-orange-500" />
              Study Material Type
            </Label>
            <Select
              value={studyType}
              onValueChange={setStudyType}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-orange-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notes">
                  <div className="flex items-center">
                    <BookMarked className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Study Notes</span>
                    <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Recommended</span>
                  </div>
                </SelectItem>
                <SelectItem value="summary">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Chapter Summary</span>
                  </div>
                </SelectItem>
                <SelectItem value="flashcards">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Flashcards</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Study Material Metadata */}
          <div className="space-y-4 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Material Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-orange-500" />
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter material title"
                  value={metadata.title}
                  onChange={(e) => handleMetadataChange("title", e.target.value)}
                  className="border-gray-200 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-orange-500" />
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics"
                  value={metadata.subject}
                  onChange={(e) => handleMetadataChange("subject", e.target.value)}
                  className="border-gray-200 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic" className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-orange-500" />
                  Topic
                </Label>
                <Input
                  id="topic"
                  placeholder="e.g., Calculus, Thermodynamics"
                  value={metadata.topic}
                  onChange={(e) => handleMetadataChange("topic", e.target.value)}
                  className="border-gray-200 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-orange-500" />
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  placeholder="e.g., derivatives, heat transfer"
                  value={metadata.keywords}
                  onChange={(e) => handleMetadataChange("keywords", e.target.value)}
                  className="border-gray-200 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-orange-300 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            <span>Convert to Markdown</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export {StudyConvertBox}