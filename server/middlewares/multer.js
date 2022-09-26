import multer from "multer";
import path from "path";

const multerUploads = multer({
  storage: multer.diskStorage({}),
  fileFilter: (request, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(
        new Error(
          "File extension not supported. Upload has to be in .jpg, .jpeg oder .png."
        ),
        false
      );
      return;
    }
    cb(null, true);
  },
});

export { multerUploads };
