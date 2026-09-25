import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  fileName: (req, file, cb) => {
    const ext = path.extname;
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed! (jpeg, jpg, png, webp)"),
      false,
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size is 5MB
});
