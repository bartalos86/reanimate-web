import { CheckIcon, ImageIcon, X } from "lucide-react";

interface BookBoxProps {
  coverImage: string;
  status: "pending" | "completed" | "failed";
  progressStep?: 1 | 2 | 3;
}

export default function BookBox({ coverImage, status, progressStep = 1 }: BookBoxProps) {
  return (
    <>
      <div className="relative border-2 rounded-lg aspect-[2/3] w-[160px] min-w-[130px] cursor-pointer transition-colors overflow-hidden">
        {status !== "pending" ? (
          <div className="top-0 absolute w-full h-full bg-[#ffffff7d] z-50 opacity-100 flex">
            {status === "completed" ? (
              <div className="mx-auto my-auto text-xl opacity-60">
                <CheckIcon size={45} color="green" />
              </div>
            ) : (
              <div className="mx-auto my-auto text-xl opacity-60">
                <X size={45} color="red" />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {coverImage ? (
          <div className="w-full h-full relative">
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2">
            <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
          </div>
        )}

      </div>
      {/* Themed loading bar under the cover image when pending */}
      {status === "pending" && (
        <div className="w-full mt-2 flex items-center justify-center gap-2">
          {[1, 1, 1].map((step) => (
            <span
              key={step}
              className={
                step === progressStep
                  ? "inline-block w-6 h-1.5 rounded-full bg-primary border border-primary"
                  : "inline-block w-6 h-1.5 rounded-full border border-border bg-background"
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
