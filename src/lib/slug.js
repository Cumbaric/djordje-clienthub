export function toSlug(value) {
  return String(value).toLowerCase().replaceAll(" ", "-");
}
