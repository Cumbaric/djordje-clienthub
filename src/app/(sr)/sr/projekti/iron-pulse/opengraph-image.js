import { projectOgImage } from "@/lib/ogImage";

export const alt = "Iron Pulse — studija slučaja";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectOgImage("iron-pulse", "sr");
}
