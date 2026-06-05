import { isPreviewMode } from "@/lib/utils/preview";

export function ContentPlaceholder({ value, fallback }: { value: string; fallback?: string }) {
  const preview = isPreviewMode();
  const isTodo = value.includes("[TODO:");
  if (preview || !isTodo) return <>{value}</>;
  return <>{fallback || "Content will be added shortly."}</>;
}
