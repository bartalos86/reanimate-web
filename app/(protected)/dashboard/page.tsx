"use client"
import { BookOpen, Sparkles, ArrowRight, Cpu, Bot, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConversionBox } from "@/components/conversion/conversion-box";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function DasboardPage() {

  return (
    <div className="min-h-screen  mt-12 overflow-hidden">
      {/* Hero Section */}
      <section className="container ml-12 px-4 pt-12 pb-42 md:pt-20 md:pb-42 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Digitalize your favourite{" "}
              <span className="bg-gradient-to-t from-orange-300 to-orange-400  bg-clip-text font-bold text-transparent">
                books
              </span>{" "}
              with{" "}
              <span className={`bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text font-bold text-transparent ${poppins.className}`}>
                ReAnimate
              </span>{" "}
            </h1>

            <div className="flex gap-2">
              <div className="inline-flex items-center bg-orange-100 rounded-full px-4 py-1.5 text-orange-700 font-medium text-sm mt-2">
                <Sparkles className="h-4 w-4 mr-2" />
                With Cutting-Edge AI OCR
              </div>

              {/* <div className="inline-flex items-center bg-orange-100 rounded-full px-4 py-1.5 text-orange-700 font-medium text-sm mt-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Content conversion
            </div> */}
            </div>

            <p className="text-lg md:text-lg text-gray-700 max-w-2xl">
              Reanimate combines the leading AI based OCR technology with AI
              correction to convert PDFs to EPUB or Markdown files with
              exceptional accuracy.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button variant={"outline"}>See Examples</Button>
              <Button>
                Convert Now <ArrowRight></ArrowRight>
              </Button>
            </div>

            {/* <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center text-sm text-gray-600">
                <Check className="h-5 w-5 text-orange-500 mr-2" />
                <span>Mistral AI Conversion</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="h-5 w-5 text-orange-500 mr-2" />
                <span>99% Accuracy</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="h-5 w-5 text-orange-500 mr-2" />
                <span>Preserves Formatting</span>
              </div>
            </div> */}
          </div>

          <div className="max-w-[500px]">
            <img
              src="/hero_3.png"
              alt="Picture of the author"
              className="transform -rotate-10 translate-x-20 translate-y-7 scale-[1.3]"
            />
          </div>
          {/* Right Content - Conversion Box */}
          {/* <ConversionBox></ConversionBox> */}
        </div>
      </section>

      <div className="bg-gradient-to-b from-white to-orange-50">
        <section className="container mx-auto flex justify-center items-center py-8 px-4">
          <div className="w-full max-w-[100%] flex justify-center">
            <ConversionBox />
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Machine learning algorithms are used for content extraction in
              combination with advanced models revise text to generate the most
              accurate digital representation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-orange-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                  <Bot className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Smart OCR Scanning
                </h3>
                <p className="text-gray-600">
                  {/* Uses cutting edge AI OCR technology to extract text and images
                from Pdf.  */}
                  ReAnimate is capable of accurately extracting text, tables and
                  images from PDF scans.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-orange-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                  <Cpu className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Intelligent Formatting
                </h3>
                <p className="text-gray-600">
                  It is capable of extracting and formatting content with proper
                  chapters, paragraphs, and styling elements.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-orange-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-5">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Digital Conversion
                </h3>
                <p className="text-gray-600">
                  It transforms scanned content using our unique fine-tuned
                  stylesheet to formatted EPUB or Markdown files ready for use.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Credit System Banner */}
      <section className="bg-white py-8 ">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center flex-col gap-4 flex-nowrap">
            {/* <Link href={"/home"}>asd</Link> */}
            <Button variant={"outline"} className="max-w-[150px] mx-auto">
              <Coffee></Coffee>Buy me a cofee
            </Button>

            <p className="text-black/70 text-sm">Copyright Mark Soft</p>
          </div>
        </div>
      </section>
    </div>
  );
}
