import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const ext = path.extname(file.originalname).toLocaleLowerCase();

  let isCorrect = false;
  if (ext == ".jpeg" || ext == ".png" || ext == ".jpg" || ext == ".mp4") {
    isCorrect = true;
  } else {
    isCorrect = false;
  }

  if (isCorrect) {
    return cb(null, true);
  } else {
    cb("Images Only !!");
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
