import multer from "multer";
import { FIELDSIZE, MIMETYPES } from "../config/constants";
import { extname } from "path";

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const fileExtention = extname(file.originalname);
      const fileName = file.originalname.split(fileExtention)[0];
      cb(null, `${fileName}-${Date.now()}${fileExtention}`);
    },
  }),
  fileFilter: (rep, file, cb) => {
    console.log(file);
    if (MIMETYPES.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(
        new Error(`Only ${MIMETYPES.join(", ")} mimetypes are allowed`)
      );
    }
  },
  limits: { fieldSize: FIELDSIZE },
});
