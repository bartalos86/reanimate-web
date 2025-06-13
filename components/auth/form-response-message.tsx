import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormMessageProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

export function FormResponseMessage({ type, message, className }: FormMessageProps) {
  const Icon = type === "error" ? AlertTriangle : CheckCircle;
  const bgColor = type === "error" ? "bg-destructive/15" : "bg-emerald-500/15";
  const textColor = type === "error" ? "text-destructive" : "text-emerald-500";
  const iconColor = type === "error" ? "text-destructive" : "text-emerald-500";

  if(!message)
    return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg p-3 text-sm font-medium",
        bgColor,
        className
      )}
    >
      <Icon className={cn("h-5 w-5", iconColor)} />
      <p className={textColor}>{message}</p>
    </div>
  );
}