import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); 
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, callback) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

export default upload;
