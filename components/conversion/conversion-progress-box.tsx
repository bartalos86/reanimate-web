"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import BookBox from "./book-box";

export default function ConversionProgressBox() {

  const isbn = "9789635040179";
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    async function fetchCover() {
      const res = await fetch(`https://bookcover.longitood.com/bookcover/${isbn}`);
      const data = await res.json();
      setCoverImage(data.url ?? "");
    }
    fetchCover();
  }, [isbn]);





  return (
    <>
      <div className="flex-1 w-full max-w-[800px] mb-8">
        <Card>
          <CardContent>
            <div
              className="book-list-container flex overflow-x-scroll gap-1 snap-x snap-mandatory"
            >
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="snap-start"
                >
                  <BookBox coverImage={coverImage} status="pending"/>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
