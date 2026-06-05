export function isPreviewMode() {
  return process.env.NEXT_PUBLIC_CONTENT_PREVIEW_MODE !== "false";
}

export function publicRecords<T extends { placeholder?: boolean }>(items: T[]) {
  return isPreviewMode() ? items : items.filter((item) => !item.placeholder);
}
