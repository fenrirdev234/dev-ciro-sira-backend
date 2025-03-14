import multer from "multer";

import { FIELDSIZE, MIMETYPES } from "../config/constants";
import { logger } from "../utils/logger";

/* const diskStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileExtention = extname(file.originalname);
    const fileName = encodeURIComponent(
      file.originalname.split(fileExtention)[0]
    );
    cb(null, `${fileName}-${Date.now()}${fileExtention}`);
  },
}); */

const memoryStorage = multer.memoryStorage();

export const multerUpload = multer({
  storage: memoryStorage,
  fileFilter: (rep, file, cb) => {
    logger.info(file);
    if (MIMETYPES.some((filetype) => filetype === file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(
        new Error(`Only ${MIMETYPES.join(", ")} mimetypes are allowed`)
      );
    }
  },
  limits: { fieldSize: FIELDSIZE },
});
