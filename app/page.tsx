"use client"
import { Sparkles, ArrowRight, FileText, BookOpen, Bot, Cpu, GraduationCap, Table2, ArrowRightCircle, Upload, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-32 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Digitalize your favourite{" "}
              <span className="bg-gradient-to-t from-orange-300 to-orange-400 bg-clip-text font-bold text-transparent">
                books
              </span>{" "}
              with{" "}
              <span className={`bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text font-bold text-transparent ${poppins.className}`}>
                ReAnimate
              </span>
            </h1>

            <div className="flex gap-2">
              <div className="inline-flex items-center bg-orange-100 rounded-full px-4 py-1.5 text-orange-700 font-medium text-sm mt-2">
                <Sparkles className="h-4 w-4 mr-2" />
                With Cutting-Edge AI OCR
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              Transform your physical books into digital formats with exceptional accuracy.
              Our AI-powered platform preserves the original formatting while making your content
              searchable and accessible.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/examples">
                <Button variant="outline" className="h-12 px-6">
                  See Examples
                </Button>
              </Link>
              <Link href="/convert">
                <Button className="h-12 px-6">
                  Convert Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="max-w-[500px]">
            <img
              src="/hero_3.png"
              alt="Book digitalization illustration"
              className="transform -rotate-10 translate-x-20 translate-y-7 scale-[1.3]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-orange-50"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/80 backdrop-blur-sm rounded-full text-orange-700 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Key Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-orange-600">ReAnimate</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI technology with user-friendly features
                to deliver the best book digitalization experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="border-orange-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                    <Bot className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Smart OCR Scanning
                  </h3>
                  <p className="text-gray-600">
                    ReAnimate uses advanced AI OCR technology to accurately extract text,
                    tables, and images from PDF scans with exceptional precision.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-orange-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                    <Cpu className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Intelligent Formatting
                  </h3>
                  <p className="text-gray-600">
                    Preserves original formatting including chapters, paragraphs, and styling
                    elements while making the content fully searchable.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-orange-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Formats
                  </h3>
                  <p className="text-gray-600">
                    Convert your books to various digital formats including EPUB, Markdown,
                    and more, making them accessible across all devices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Text Comparison Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-orange-700 mb-6 shadow-sm border border-orange-100/50">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">See the Difference</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Before & After</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
                  Experience the transformation from raw PDF content to beautifully formatted digital books.
                  Our AI-powered system ensures perfect formatting and readability.
                </p>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Original PDF */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-100/50 to-orange-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-100/20 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 bg-orange-100/50 rounded-xl flex items-center justify-center">
                          <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Original PDF</h3>
                      </div>
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200/50">
                        <div className="p-6 h-full flex flex-col">
                          <div className="space-y-4">
                            <div className="h-4 bg-gray-200/70 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-3/4"></div>
                          </div>
                          <div className="mt-8 space-y-4">
                            <div className="h-4 bg-gray-200/70 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200/70 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-500 text-center">
                        Raw, unformatted content
                      </p>
                    </div>
                  </div>

                  {/* Converted Book */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-100/50 to-orange-200/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-100/20 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 bg-orange-100/50 rounded-xl flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Converted Book</h3>
                      </div>
                      <div className="aspect-[3/4] bg-gradient-to-br from-orange-50/50 to-orange-100/50 rounded-xl overflow-hidden border border-orange-200/50">
                        <div className="p-6 h-full flex flex-col">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Chapter 1: The Beginning</h4>
                          <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua.
                            </p>
                            <p className="leading-relaxed">
                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                            <p className="leading-relaxed">
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                              eu fugiat nulla pariatur.
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-500 text-center">
                        Perfectly formatted digital text
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100/50 rounded-full text-orange-700">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">98% Text Recognition Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Features Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/80 backdrop-blur-sm rounded-full text-orange-700 mb-4">
                <GraduationCap className="h-5 w-5" />
                <span className="font-medium">Perfect for Students</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Extract & Organize <span className="text-orange-600">Study Materials</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transform your PDFs, presentations, and study materials into editable, searchable content.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Feature List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Text Extraction</h3>
                    <p className="text-gray-600">
                      Extract text from PDFs and presentations while preserving formatting,
                      making it easy to copy and edit content for your notes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Image Capture</h3>
                    <p className="text-gray-600">
                      Automatically extract and save images, diagrams, and charts from your
                      study materials in high quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:scale-[1.02] transition-all duration-300">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Table2 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Table Recognition</h3>
                    <p className="text-gray-600">
                      Convert tables from PDFs into editable formats, perfect for data analysis
                      and research papers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Demo */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl -rotate-2"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-orange-100 bg-orange-50/50">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-orange-100 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-orange-100 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                          <Table2 className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-orange-100 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-orange-50/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-700">Extracted Content</span>
                        <span className="text-xs text-orange-600">3 items</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-orange-100 rounded w-full"></div>
                        <div className="h-2 bg-orange-100 rounded w-5/6"></div>
                        <div className="h-2 bg-orange-100 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/convert">
                <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm hover:shadow-md">
                  Try PDF Extraction <ArrowRightCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-orange-50"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/80 backdrop-blur-sm rounded-full text-orange-700 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">How It Works</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple <span className="text-orange-600">3-Step Process</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Machine learning algorithms are used for content extraction in
                combination with advanced models revise text to generate the most
                accurate digital representation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm">
                    <Upload className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Upload</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Upload your PDF document and let our advanced OCR technology process it.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm">
                    <Cpu className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Process</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Our AI models analyze and convert the content while preserving formatting and structure.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm">
                    <Download className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Download</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Get your converted document in EPUB or Markdown format, ready for any use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Processable Formats Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/80 backdrop-blur-sm rounded-full text-orange-700 mb-4">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">AI-Ready Output Formats</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Perfect for <span className="text-orange-600">AI Processing</span>
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Our output formats are optimized for AI processing, making it easy to
                  analyze and work with your content.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm">
                      <FileText className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Markdown Format</h3>
                      <p className="text-sm text-orange-600">Perfect for AI Processing</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Structured Content</p>
                        <p className="text-sm text-gray-600">Clean, semantic markup that AI models can easily parse and understand</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Easy Integration</p>
                        <p className="text-sm text-gray-600">Seamlessly connect with AI tools, APIs, and processing pipelines</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Future-Proof</p>
                        <p className="text-sm text-gray-600">Ready for advanced AI applications and emerging technologies</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-sm">
                      <BookOpen className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">EPUB Format</h3>
                      <p className="text-sm text-orange-600">Enhanced Reading Experience</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Rich Metadata</p>
                        <p className="text-sm text-gray-600">Structured information that AI can use for better content understanding</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Semantic Structure</p>
                        <p className="text-sm text-gray-600">Clear content hierarchy that AI can analyze and process</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 bg-orange-50 rounded-full mt-1">
                        <Check className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Cross-Platform</p>
                        <p className="text-sm text-gray-600">Compatible with all major e-readers and AI processing tools</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-orange-50"></div>
        <div className="relative py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/80 backdrop-blur-sm rounded-full text-orange-700 mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Ready to Transform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Converting Your Books <span className="text-orange-600">Today</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of readers who have already digitized their book collections
              with ReAnimate.
            </p>
            <Link href="/convert">
              <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-sm hover:shadow-md">
                Start Converting Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
