"use client"
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionBox } from "@/components/conversion/conversion-box";

export default function ConvertPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Conversion
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your books into modern digital formats. Perfect for readers looking to enhance their reading experience.
          </p>
        </div>

        {/* Conversion Box */}
        <div className="flex justify-center">
          <ConversionBox />
        </div>
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
