"use client"
import { StudyConvertBox } from "@/components/study/study-convert-box";
import { GraduationCap, BookOpen, Brain } from "lucide-react";

export default function StudyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study Material Extraction
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your study materials into organized, easy-to-review formats. Perfect for students looking to enhance their learning experience.
          </p>
        </div>

        {/* Features Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Smart Notes</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Convert your materials into well-structured study notes with key concepts highlighted.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Brain className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Chapter Summaries</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get concise summaries of chapters with main points and important details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <GraduationCap className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Flashcards</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Generate flashcards for quick review and better retention of key concepts.
            </p>
          </div>
        </div> */}

        {/* Conversion Box */}
        <div className="flex justify-center">
          <StudyConvertBox />
        </div>
      </div>
    </div>
  );
}