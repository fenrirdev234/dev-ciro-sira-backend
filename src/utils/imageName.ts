import { extname } from "path";

export const imageName = (
  originalName: string,
  newExtention: ".webp" | ".avif"
) => {
  const fileExtention = extname(originalName);
  const fileName = encodeURIComponent(originalName.split(fileExtention)[0]);
  return `${fileName}-${Date.now()}${newExtention}`;
};
