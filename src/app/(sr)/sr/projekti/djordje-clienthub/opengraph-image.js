import { projectOgImage } from "@/lib/ogImage";

export const alt = "Djordje ClientHub — studija slučaja";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return projectOgImage("djordje-clienthub", "sr");
}
