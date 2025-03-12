import { extname } from "path";

export const imageName = (
  originalName: string,
  newExtention: ".webp" | ".avif"
) => {
  const fileExtention = extname(originalName);
  const deleteWhiteSpace = originalName
    .split(fileExtention)[0]
    .split(" ")
    .join("");
  const fileName = encodeURIComponent(deleteWhiteSpace);
  return `${fileName}-${Date.now()}${newExtention}`;
};
